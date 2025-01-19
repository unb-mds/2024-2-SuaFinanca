import {
  CreateTransactionParams,
  ITransactionRepository,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import {
  ITransactionWithId,
  TransactionType,
} from "@/domain/entities/Transaction";

import { prisma } from "@/main/config/database/prisma";

export class PrismaTransactionRepository implements ITransactionRepository {
  async createTransaction(
    params: CreateTransactionParams,
  ): Promise<ITransactionWithId> {
    const newTransaction = await prisma.transaction.create({
      data: {
        type: params.type,
        amount: params.amount,
        userId: params.userId,
        categoryId: params.categoryId,
        date: params.date,
      },
    });
    return {
      ...newTransaction,
      type: newTransaction.type as unknown as TransactionType,
    };
  }
}
