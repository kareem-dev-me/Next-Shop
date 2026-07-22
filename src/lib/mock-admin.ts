export const adminStats = {
  products: 24,
  orders: 18,
  customers: 42,
  revenue: 12840,
};

export const mockAdminProducts = [
  {
    id: "p1",
    name: "Pulse Headphones",
    category: "Audio",
    price: 249,
    stock: 32,
    status: "active",
  },
  {
    id: "p2",
    name: "Nova Earbuds",
    category: "Audio",
    price: 129,
    stock: 80,
    status: "active",
  },
  {
    id: "p3",
    name: "Orbit Speaker",
    category: "Audio",
    price: 179,
    stock: 12,
    status: "low",
  },
  {
    id: "p4",
    name: "Flux Watch",
    category: "Wearables",
    price: 299,
    stock: 0,
    status: "out",
  },
] as const;

export const mockAdminCategories = [
  { id: "c1", name: "Audio", slug: "audio", products: 12 },
  { id: "c2", name: "Wearables", slug: "wearables", products: 6 },
  { id: "c3", name: "Accessories", slug: "accessories", products: 6 },
] as const;

export const mockAdminCustomers = [
  {
    id: "cu1",
    name: "Sara Ahmed",
    email: "sara@example.com",
    orders: 5,
    spent: 890,
  },
  {
    id: "cu2",
    name: "Omar Hassan",
    email: "omar@example.com",
    orders: 2,
    spent: 378,
  },
  {
    id: "cu3",
    name: "Lina Farid",
    email: "lina@example.com",
    orders: 8,
    spent: 2140,
  },
] as const;

export const mockAdminUsers = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@nextshop.com",
    role: "ADMIN",
  },
  {
    id: "u2",
    name: "Support Lead",
    email: "support@nextshop.com",
    role: "ADMIN",
  },
  {
    id: "u3",
    name: "Guest Editor",
    email: "editor@nextshop.com",
    role: "USER",
  },
] as const;

export const mockRecentOrders = [
  {
    id: "ORD-1042",
    customer: "Sara Ahmed",
    total: 378,
    status: "PAID",
  },
  {
    id: "ORD-1041",
    customer: "Omar Hassan",
    total: 249,
    status: "SHIPPED",
  },
  {
    id: "ORD-1040",
    customer: "Lina Farid",
    total: 428,
    status: "PENDING",
  },
  {
    id: "ORD-1039",
    customer: "Guest Shopper",
    total: 129,
    status: "DELIVERED",
  },
] as const;
