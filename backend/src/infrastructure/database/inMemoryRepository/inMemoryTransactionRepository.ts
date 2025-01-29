import {
  CreateTransactionParams,
  ITransactionRepository,
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
}
