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
  date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Date must be in the format YYYY-MM-DD",
  }),
});

export { CreateTransactionSchema };
