export interface UpdateTransactionReturn {
  transaction: {
    type: string;
    amount: number;
    description?: string;
    categoryName?: string;
    date: Date;
  };
}

export interface UpdateTransactionResponse {
  message: string;
  transaction: {
    type: string;
    amount: number;
    description?: string;
    categoryName?: string;
    date: Date;
  };
}
