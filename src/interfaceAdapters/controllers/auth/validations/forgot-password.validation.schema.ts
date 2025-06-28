import { z } from "zod";
import { emailValidationSchema } from "../../../../shared/validations/email.validation";

export const forgotPasswordSchema = z.object({
  email: emailValidationSchema,
});
