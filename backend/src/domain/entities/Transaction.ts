export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface ITransaction {
  type: TransactionType;
  amount: number;
  description?: string | null;
  userId: number;
  categoryId?: number | null;
  date: Date;
}

export interface ITransactionWithId {
  id: number;
  type: TransactionType;
  amount: number;
  description?: string | null;
  userId: number;
  categoryId?: number | null;
  date: Date;
}

export interface ITransactionSummary {
  type: TransactionType;
  amount: number;
  description?: string | null;
  categoryId?: number | null;
  date: Date;
}
