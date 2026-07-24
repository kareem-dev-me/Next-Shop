export {
  DEFAULT_PAGE_SIZE,
  resolvePagination,
  type Pagination,
} from "./pagination";

export {
  createPrismaCrud,
  type CrudDelegate,
  type PaginatedResult,
  type FindPageOptions,
  type PrismaCrud,
} from "./prisma-crud";

export {
  stockStatus,
  getProductsPage,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type CreateProductInput,
  type UpdateProductInput,
  type ProductWithCategory,
} from "./products";

export {
  listCategories,
  getCategoriesPage,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  type CategoryOption,
  type CategoryWithCount,
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "./categories";

export {
  getCustomersPage,
  getCustomerById,
  getCustomerByEmail,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  type CustomerListItem,
  type CreateCustomerInput,
  type UpdateCustomerInput,
} from "./customers";

export {
  getUsersPage,
  getAdminUserById,
  countAdmins,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  type AdminUserListItem,
  type CreateAdminUserInput,
  type UpdateAdminUserInput,
} from "./users";

export {
  getDashboardStats,
  getRecentOrders,
  type DashboardStats,
  type RecentOrderItem,
} from "./dashboard";
