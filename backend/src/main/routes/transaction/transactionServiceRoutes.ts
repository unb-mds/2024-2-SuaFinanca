import { Request, Response } from "express";

import { createTransactionController } from "@/main/config/dependencyInjection/transactionDependencyInjection";

export async function createTransaction(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await createTransactionController.handle({
    body: { ...req.body, userId: req.userId },
  });
  res.status(statusCode).send(body);
}
