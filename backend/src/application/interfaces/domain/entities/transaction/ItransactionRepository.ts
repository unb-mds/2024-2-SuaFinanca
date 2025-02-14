import {
  ITransactionWithId,
  TransactionType,
} from "@/domain/entities/Transaction";

export interface CreateTransactionParams {
  type: TransactionType;
  amount: number;
  description?: string | null;
  userId: number;
  categoryId?: number;
  date: string;
}

export interface CreateTransactionParamsWithCategoryName {
  type: TransactionType;
  amount: number;
  description?: string | null;
  userId: number;
  categoryName?: string;
  date: string;
}

export interface UpdateTransactionWithCategoryNameParams {
  id: number;
  type?: TransactionType;
  amount?: number;
  description?: string | null;
  userId: number;
  categoryName?: string | null;
  date?: string;
}

export interface UpdateTransactionParams {
  id: number;
  type?: TransactionType;
  amount?: number;
  description?: string | null;
  userId: number;
  categoryId?: number | null;
  date?: string;
}

export interface GetUserBalanceParams {
  userId: number;
  month: number;
  year: number;
}

export interface GetRecentTransactionsParams {
  userId: number;
  limit: number;
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
  findRecentTransactions(
    userId: number,
    limit: number,
  ): Promise<ITransactionWithId[]>;
  deleteTransaction(id: number, userId: number): Promise<void>;
  findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<ITransactionWithId | null>;
}
