import { z } from "zod";

const UpdateUserSchema = z.object({
  id: z.number().int().positive("User ID must be a positive integer"),
  name: z.string().min(1, "Name cannot be empty").optional(),
  email: z.string().email().min(1, "Email cannot be empty").optional(),
  password: z.string().min(1, "Password cannot be empty").optional(),
});

export { UpdateUserSchema };
