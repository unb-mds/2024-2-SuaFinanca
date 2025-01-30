export interface UpdateTransactionReturn {
  transaction: {
    type: string;
    amount: number;
    categoryName?: string;
    date: Date;
  };
}

export interface UpdateTransactionResponse {
  message: string;
  transaction: {
    type: string;
    amount: number;
    categoryName?: string;
    date: Date;
  };
}
