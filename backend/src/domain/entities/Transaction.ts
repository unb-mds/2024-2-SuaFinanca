export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface ITransaction {
  type: TransactionType;
  amount: number;
  userId: number;
  categoryId?: number | null;
  date?: Date | null;
}

export interface ITransactionWithId {
  id: number;
  type: TransactionType;
  amount: number;
  userId: number;
  categoryId?: number | null;
  date?: Date | null;
}
