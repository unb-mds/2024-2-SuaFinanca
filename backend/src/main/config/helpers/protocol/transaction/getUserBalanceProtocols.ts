import {
  ITransactionSummary,
  ITransactionWithId,
} from "@/domain/entities/Transaction";

export interface GetUserBalanceReturn {
  balance: {
    balance: number;
    totalIncome: number;
    totalExpense: number;
    incomeTransactions: ITransactionWithId[];
    expenseTransactions: ITransactionWithId[];
  };
}

export interface GetUserBalanceResponse {
  message: string;
  balance: {
    balance: number;
    totalIncome: number;
    totalExpense: number;
  };
}

export interface GetUserBalanceSummaryResponse {
  message: string;
  summary: {
    incomeTransactions: ITransactionSummary[];
    expenseTransactions: ITransactionSummary[];
  };
}
