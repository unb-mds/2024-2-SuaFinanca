import { z } from "zod";

const UpdateTransactionSchema = z.object({
  type: z.string().min(1, "Type cannot be empty"),
  amount: z.number().int().positive("Amount must be a positive integer"),
});

export { UpdateTransactionSchema };
