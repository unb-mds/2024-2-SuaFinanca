import { z } from "zod";

const CreateCategorySchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  userId: z.number().int().positive("User ID must be a positive integer"),
});

export { CreateCategorySchema };
