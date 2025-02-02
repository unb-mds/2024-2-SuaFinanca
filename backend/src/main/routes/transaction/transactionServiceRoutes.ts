import { Request, Response } from "express";
import {
  createTransactionController,
  getRecentTransactionsController,
  getUserBalanceController,
  updateTransactionController,
} from "@/main/config/dependencyInjection/transactionDependencyInjection";

export async function createTransaction(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await createTransactionController.handle({
    body: { ...req.body, userId: req.userId },
  });
  res.status(statusCode).send(body);
}

export async function getUserBalance(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await getUserBalanceController.handle({
    query: req.query,
    userId: req.userId,
  });
  res.status(statusCode).send(body);
}

export async function getRecentTransactions(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await getRecentTransactionsController.handle({
    userId: req.userId,
    query: req.query,
  });
  res.status(statusCode).send(body);
}

export async function updateTransaction(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await updateTransactionController.handle({
    params: req.params,
    userId: req.userId,
    body: req.body,
  });
  res.status(statusCode).send(body);
}
