import { string, z } from "zod";
import { nameSchema } from "../../../../shared/validations/name.validation";
import { capitalizeWords } from "../../../../shared/validations/capitalization";

export const categorySchema = z.object({
  categoryName: nameSchema.transform(capitalizeWords),
  description: string().min(5),
});
