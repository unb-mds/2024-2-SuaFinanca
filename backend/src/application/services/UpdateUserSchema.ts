import { z } from "zod";

const UpdateUserSchema = z.object({
  id: z.number().int().positive("User ID must be a positive integer"),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export { UpdateUserSchema };
