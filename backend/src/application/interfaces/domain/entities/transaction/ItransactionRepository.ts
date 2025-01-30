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

export interface UpdateTransactionParams {
  id: number;
  type: TransactionType;
  amount: number;
  userId: number;
  categoryId?: number;
  date: string;
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
  ): Promise<ITransactionWithId>;
  findByUserIdAndMonthAndYearAndType(
    userId: number,
    month: number,
    year: number,
    type: TransactionType,
  ): Promise<ITransactionWithId[]>;
}
