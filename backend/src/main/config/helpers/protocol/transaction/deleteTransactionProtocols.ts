export interface DeleteTransactionRequest {
  transactionId: string;
}

export interface DeleteTransactionResponse {
  success: boolean;
  message?: string;
}
