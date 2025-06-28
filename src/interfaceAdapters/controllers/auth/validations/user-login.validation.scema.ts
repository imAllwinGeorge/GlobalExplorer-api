import { z } from "zod";
import { passwordSchema } from "../../../../shared/validations/password.validation";
import { emailValidationSchema } from "../../../../shared/validations/email.validation";

export const loginShcema = z.object({
  email: emailValidationSchema,
  password: passwordSchema,
  role: z.enum(["user", "admin", "host"], {
    message: "Invalid role",
  }),
});
