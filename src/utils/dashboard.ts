import prisma from "@/lib/prisma";

export type DashboardStats = {
  products: number;
  orders: number;
  customers: number;
  revenue: number;
};

export type RecentOrderItem = {
  id: string;
  shortId: string;
  customer: string;
  total: number;
  status: string;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [products, orders, customers, revenueAgg] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.order.aggregate({
      where: { status: { not: "CANCELLED" } },
      _sum: { total: true },
    }),
  ]);

  return {
    products,
    orders,
    customers,
    revenue: revenueAgg._sum.total ?? 0,
  };
}

export async function getRecentOrders(
  limit = 5,
): Promise<RecentOrderItem[]> {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return orders.map((order) => ({
    id: order.id,
    shortId: order.id.slice(-8).toUpperCase(),
    customer: order.user.name?.trim() || order.user.email,
    total: order.total,
    status: order.status,
  }));
}
