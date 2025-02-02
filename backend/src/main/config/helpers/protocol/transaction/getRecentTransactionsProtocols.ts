import { ITransactionSummary } from "@/domain/entities/Transaction";

export interface GetRecentTransactionsReturn {
  recent: {
    transaction: ITransactionSummary[];
  };
}

export interface GetRecentTransactionsResponse {
  message: string;
  recent: {
    transaction: ITransactionSummary[];
  };
}
