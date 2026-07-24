export {
  emailSchema,
  passwordSchema,
  roleSchema,
  slugSchema,
} from "./common";

export {
  adminLoginSchema,
  loginSchema,
  signupSchema,
  type AdminLoginInput,
  type LoginInput,
  type SignupInput,
} from "./auth";

export { checkoutSchema, type CheckoutInput } from "./checkout";

export {
  addProductSchema,
  updateProductSchema,
  type AddProductInput,
  type UpdateProductInput,
} from "./product";


export {
  addCategorySchema,
  updateCategorySchema,
  type AddCategoryInput,
  type UpdateCategoryInput,
} from "./category";

export {
  addUserSchema,
  updateUserSchema,
  type AddUserInput,
  type UpdateUserInput,
} from "./user";

export {
  addCustomerSchema,
  updateCustomerSchema,
  type AddCustomerInput,
  type UpdateCustomerInput,
} from "./customer";

export {
  updateProfileSchema,
  type UpdateProfileInput,
} from "./profile";

export {
  addressSchema,
  type AddressInput,
} from "./address";
