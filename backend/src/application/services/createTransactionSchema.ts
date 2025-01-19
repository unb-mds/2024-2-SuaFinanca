import { z } from "zod";

const CreateTransactionSchema = z.object({
  type: z
    .enum(["INCOME", "EXPENSE"])
    .refine((val) => ["INCOME", "EXPENSE"].includes(val), {
      message: "Invalid transaction type",
    }),
  amount: z.number().positive("Amount must be a positive number"),
  userId: z.number().int().positive("User ID must be a positive integer"),
  categoryName: z.string().optional(),
  date: z.string().optional(),
});

export { CreateTransactionSchema };
