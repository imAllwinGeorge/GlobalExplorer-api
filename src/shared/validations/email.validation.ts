import { z } from "zod";

export const emailValidationSchema = z
  .string()
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Invalid email format",
  });
