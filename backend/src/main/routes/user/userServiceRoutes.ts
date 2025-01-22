import { Request, Response } from "express";
import {
  createUserController,
  deleteUserController,
  loginUserController,
} from "@/main/config/dependencyInjection/userDependencyInjection";

export async function createUser(req: Request, res: Response): Promise<void> {
  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const { body, statusCode } = await loginUserController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
}

export async function authUser(req: Request, res: Response): Promise<void> {
  res.json({
    decodedToken: req.userId,
  });
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { body, statusCode } = await deleteUserController.handle({
    body: req.userId,
  });
  res.status(statusCode).send(body);
}
