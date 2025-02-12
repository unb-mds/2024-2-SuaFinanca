import { z } from "zod";

const UpdateTransactionSchema = z.object({
  id: z.number().int().positive("ID must be a positive integer"),
  userId: z.number().int().positive("User ID must be a positive integer"),
  type: z.string().min(1, "Type cannot be empty").optional(),
  amount: z
    .number()
    .int()
    .positive("Amount must be a positive integer")
    .optional(),
  categoryName: z.string().nullable().optional(),
  date: z.string().min(1, "Date cannot be empty").optional(),
});

export { UpdateTransactionSchema };
