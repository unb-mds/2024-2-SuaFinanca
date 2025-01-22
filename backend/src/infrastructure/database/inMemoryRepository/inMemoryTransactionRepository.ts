import {
  CreateTransactionParams,
  ITransactionRepository,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";

import { ITransactionWithId } from "@/domain/entities/Transaction";

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: ITransactionWithId[] = [];
  private currentId = 1;

  async createTransaction(
    params: CreateTransactionParams,
  ): Promise<ITransactionWithId> {
    const newTransaction: ITransactionWithId = {
      id: this.currentId++,
      ...params,
      date: params.date ? new Date(params.date) : undefined,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}
