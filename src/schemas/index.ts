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

export { addProductSchema, type AddProductInput } from "./product";

export { addCategorySchema, type AddCategoryInput } from "./category";

export { addUserSchema, type AddUserInput } from "./user";
