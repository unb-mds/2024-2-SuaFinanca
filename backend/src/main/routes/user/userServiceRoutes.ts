import { Request, Response } from "express";

import { createUserController } from "@/main/config/dependencyInjection/userDependencyInjection";

export async function createUser(req: Request, res: Response): Promise<void> {
  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
}
