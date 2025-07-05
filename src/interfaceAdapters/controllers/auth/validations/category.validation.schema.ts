import { capitalizeWords } from "shared/validations/capitalization";
import { nameSchema } from "shared/validations/name.validation";
import { string, z } from "zod";

export const categorySchema = z.object({
  categoryName: nameSchema.transform(capitalizeWords),
  description: string().min(5),
});
