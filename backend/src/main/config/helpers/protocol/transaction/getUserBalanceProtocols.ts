export interface GetUserBalanceReturn {
  balance: {
    balance: number;
    totalIncome: number;
    totalExpense: number;
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
