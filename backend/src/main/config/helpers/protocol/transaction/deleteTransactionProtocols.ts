export interface DeleteTransactionReturn {
  transaction: {
    type: string;
    amount: number;
    categoryName?: string;
    date: Date;
  };
}

export interface DeleteTransactionResponse {
  message: string;
  transaction: {
    type: string;
    amount: number;
    categoryName?: string;
    date: Date;
  };
}
