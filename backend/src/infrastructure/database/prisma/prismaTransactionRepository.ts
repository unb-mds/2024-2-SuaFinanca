import {
  CreateTransactionParams,
  ITransactionRepository,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import {
  ITransactionWithId,
  TransactionType,
} from "@/domain/entities/Transaction";
import { endOfDay, startOfDay } from "date-fns";

import { log } from "@/main/config/logs/log";
import { prisma } from "@/main/config/database/prisma";

const logger = log("PrismaTransactionRepository");

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

    const user = await prisma.user.findUnique({
      where: { id: params.userId },
    });

    if (user) {
      const newBalance =
        params.type === TransactionType.INCOME
          ? user.balance + params.amount
          : user.balance - params.amount;

      await prisma.user.update({
        where: { id: params.userId },
        data: { balance: newBalance },
      });
    }

    return {
      ...newTransaction,
      type: newTransaction.type as unknown as TransactionType,
      date: newTransaction.date!,
    };
  }

  async findByUserIdAndMonthAndYearAndType(
    userId: number,
    month: number,
    year: number,
    type: TransactionType,
  ): Promise<ITransactionWithId[]> {
    const startDate = startOfDay(new Date(year, month, 1));
    const endDate = endOfDay(new Date(year, month + 1, 0));

    logger.debug(`startDate: ${startDate}`);
    logger.debug(`endDate: ${endDate}`);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    return transactions
      .filter((transaction) => transaction.date !== null)
      .map((transaction) => ({
        ...transaction,
        type: transaction.type as unknown as TransactionType,
        date: transaction.date as Date,
      }));
  }
}
