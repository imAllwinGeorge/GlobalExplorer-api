import { z } from "zod";
import { nameSchema } from "../../../../shared/validations/name.validation";
import { emailValidationSchema } from "../../../../shared/validations/email.validation";
import { phoneNumberSchema } from "../../../../shared/validations/phone.validation";
import { passwordSchema } from "../../../../shared/validations/password.validation";

export const userSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailValidationSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: z.enum(["user", "admin", "host"], {
    message: "Invalid role",
  }),
});
