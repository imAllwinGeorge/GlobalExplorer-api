import { z } from "zod";
import { nameSchema } from "../../../../shared/validations/name.validation";
import { emailValidationSchema } from "../../../../shared/validations/email.validation";
import { phoneNumberSchema } from "../../../../shared/validations/phone.validation";
import { passwordSchema } from "../../../../shared/validations/password.validation";
import { accountNumberSchema } from "../../../../shared/validations/accountNumber.validation";
import { ifscSchema } from "../../../../shared/validations/ifsc.validation";

export const hostSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailValidationSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: z.enum(["user", "admin", "host"], {
    message: "Role must be host",
  }),
  accountHolderName: nameSchema,
  accountNumber: accountNumberSchema,
  ifsc: ifscSchema,
  branch: nameSchema,
  kyc_idProof: z.string().optional(),
  kyc_addressProof: z.string().optional(),
  kyc_panCard: z.string().optional(),
  registrationCertificate: z.string().optional(),
  safetyCertificate: z.string().optional(),
  license: z.string().optional(),
  insurance: z.string().optional(),
});
