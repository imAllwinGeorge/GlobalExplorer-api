import { z } from "zod";

export const ifscSchema = z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
  message: "Invalid IFSC code format",
});
