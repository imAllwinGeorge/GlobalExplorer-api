import { z } from "zod";

export const accountNumberSchema = z.string().regex(/^\d{11,17}$/, {
  message: "Account number must be between 11 and 17 digits",
});
