import { z } from "zod";

const UpdateCategorySchema = z.object({
  id: z.number().int().positive("Category ID must be a positive integer"),
  name: z.string().min(1, "Name cannot be empty"),
  userId: z.number().int().positive("User ID must be a positive integer"),
});

export { UpdateCategorySchema };
