import {
  ITransactionWithId,
  TransactionType,
} from "@/domain/entities/Transaction";

export interface CreateTransactionParams {
  type: TransactionType;
  amount: number;
  userId: number;
  categoryName?: string;
  date?: string;
}

export interface ITransactionRepository {
  createTransaction(
    params: CreateTransactionParams,
  ): Promise<ITransactionWithId>;
}
