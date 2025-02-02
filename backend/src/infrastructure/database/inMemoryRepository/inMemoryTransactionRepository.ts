import {
  CreateTransactionParams,
  ITransactionRepository,
  UpdateTransactionParams,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import {
  ITransactionWithId,
  TransactionType,
} from "@/domain/entities/Transaction";

import { IUserWithId } from "@/domain/entities/User";

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: ITransactionWithId[] = [];
  private users: IUserWithId[] = [];
  private currentId = 1;

  async createTransaction(
    params: CreateTransactionParams,
  ): Promise<ITransactionWithId> {
    const newTransaction: ITransactionWithId = {
      id: this.currentId++,
      ...params,
      date: new Date(params.date),
    };
    this.transactions.push(newTransaction);

    const user = this.users.find((user) => user.id === params.userId);

    if (user) {
      const newBalance =
        params.type === TransactionType.INCOME
          ? user.balance + params.amount
          : user.balance - params.amount;

      user.balance = newBalance;
    }

    return newTransaction;
  }

  async findByUserIdAndMonthAndYearAndType(
    userId: number,
    month: number,
    year: number,
    type: TransactionType,
  ): Promise<ITransactionWithId[]> {
    return this.transactions.filter(
      (transaction) =>
        transaction.userId === userId &&
        transaction.type === type &&
        transaction.date &&
        transaction.date.getMonth() === month &&
        transaction.date.getFullYear() === year,
    );
  }
  async findRecentTransactions(
    userId: number,
    limit: number,
  ): Promise<ITransactionWithId[]> {
    const userTransactions = this.transactions
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    return userTransactions.slice(0, limit);
  }

  async findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<ITransactionWithId | null> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === id && transaction.userId === userId,
    );
    return transaction || null;
  }

  async updateTransaction(
    params: UpdateTransactionParams,
  ): Promise<ITransactionWithId> {
    const transactionIndex = this.transactions.findIndex(
      (transaction) =>
        transaction.id === params.id && transaction.userId === params.userId,
    );

    if (transactionIndex === -1) {
      throw new Error("Transaction not found.");
    }

    const updatedTransaction = {
      ...this.transactions[transactionIndex],
      ...params,
      date: params.date
        ? new Date(params.date)
        : this.transactions[transactionIndex].date,
    };

    this.transactions[transactionIndex] = updatedTransaction;
    return updatedTransaction;
  }
}
