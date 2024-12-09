import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().min(1, "Email cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

export { CreateUserSchema };
