import {
  ITransactionWithId,
  TransactionType,
} from "@/domain/entities/Transaction";

export interface CreateTransactionParams {
  type: TransactionType;
  amount: number;
  userId: number;
  categoryId?: number;
  date: string;
}

export interface CreateTransactionParamsWithCategoryName {
  type: TransactionType;
  amount: number;
  userId: number;
  categoryName?: string;
  date: string;
}

export interface UpdateTransactionWithCategoryNameParams {
  id: number;
  userId: number;
  type?: TransactionType;
  amount?: number;
  categoryName?: string | null;
  date?: string;
}

export interface UpdateTransactionParams {
  id: number;
  userId: number;
  type?: TransactionType;
  amount?: number;
  categoryId?: number | null;
  date?: string;
}

export interface GetUserBalanceParams {
  userId: number;
  month: number;
  year: number;
}

export interface ITransactionRepository {
  createTransaction(
    params: CreateTransactionParams,
  ): Promise<ITransactionWithId>;
  updateTransaction(
    params: UpdateTransactionParams,
  ): Promise<ITransactionWithId | null>;
  findByUserIdAndMonthAndYearAndType(
    userId: number,
    month: number,
    year: number,
    type: TransactionType,
  ): Promise<ITransactionWithId[]>;
  deleteTransaction(transactionId: number): Promise<void>;
  findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<ITransactionWithId | null>;
}
