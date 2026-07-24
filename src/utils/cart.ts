import prisma from "@/lib/prisma";

export type CartLineProduct = {
  name: string;
  slug: string;
  price: number;
  image: string | null;
  stock: number;
};

export type CartLine = {
  id: string;
  productId: string;
  quantity: number;
  product: CartLineProduct;
  lineTotal: number;
};

export type CartView = {
  cartId: string;
  items: CartLine[];
  subtotal: number;
};

export async function getOrCreateCart(userId: string) {
  const existing = await prisma.cart.findUnique({
    where: { userId },
  });
  if (existing) {
    return existing;
  }
  return prisma.cart.create({
    data: { userId },
  });
}

export async function getCartForUser(userId: string): Promise<CartView> {
  const cart = await getOrCreateCart(userId);
  const items = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: {
      product: {
        select: {
          name: true,
          slug: true,
          price: true,
          image: true,
          stock: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const lines: CartLine[] = items.map((item) => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    product: item.product,
    lineTotal: item.product.price * item.quantity,
  }));

  return {
    cartId: cart.id,
    items: lines,
    subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
  };
}

export class CartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CartError";
  }
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity = 1,
) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, stock: true },
  });
  if (!product) {
    throw new CartError("Product not found");
  }
  if (product.stock <= 0) {
    throw new CartError("Out of stock");
  }

  const cart = await getOrCreateCart(userId);
  const existing = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: { cartId: cart.id, productId },
    },
  });

  const nextQty = Math.min(
    product.stock,
    (existing?.quantity ?? 0) + quantity,
  );

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: nextQty },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity: Math.min(product.stock, quantity),
    },
  });
}

export async function updateCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number,
) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    throw new CartError("Cart not found");
  }

  if (quantity <= 0) {
    return removeFromCart(userId, productId);
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { stock: true },
  });
  if (!product) {
    throw new CartError("Product not found");
  }

  const nextQty = Math.min(product.stock, quantity);
  if (nextQty <= 0) {
    return removeFromCart(userId, productId);
  }

  const existing = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: { cartId: cart.id, productId },
    },
  });
  if (!existing) {
    throw new CartError("Item not found");
  }

  return prisma.cartItem.update({
    where: { id: existing.id },
    data: { quantity: nextQty },
  });
}

export async function removeFromCart(userId: string, productId: string) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    return null;
  }

  return prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });
}
