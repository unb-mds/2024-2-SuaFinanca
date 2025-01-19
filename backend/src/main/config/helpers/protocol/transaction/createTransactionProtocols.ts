export interface CreateTransactionReturn {
  transaction: {
    type: string;
    amount: number;
  };
}

export interface CreateTransactionResponse {
  message: string;
  transaction: {
    type: string;
    amount: number;
  };
}
