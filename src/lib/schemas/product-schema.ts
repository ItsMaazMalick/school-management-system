import { z } from "zod";

export const addProductSchema = z.object({
  category: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().min(1, "Price is required"),
  description: z.string().optional(),
  storage: z.string().min(1, "Storage is required"),
});
