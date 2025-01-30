export interface UpdateTransactionReturn {
  transaction: {
    type: string;
    amount: number;
    userId: number;
    categoryId?: number;
    date: string;
  };
}

export interface UpdateTransactionResponse {
  message: string;
  transaction: {
    type: string;
    amount: number;
    userId: number;
    categoryId?: number;
    date: string;
  };
}
