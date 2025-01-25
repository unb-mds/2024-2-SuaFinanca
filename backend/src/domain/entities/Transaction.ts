export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface ITransaction {
  type: TransactionType;
  amount: number;
  userId: number;
  categoryId?: number | null;
  date: Date;
}

export interface ITransactionWithId {
  id: number;
  type: TransactionType;
  amount: number;
  userId: number;
  categoryId?: number | null;
  date: Date;
}
