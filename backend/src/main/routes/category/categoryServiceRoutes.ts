import { Request, Response } from "express";
import {
  createCategoryController,
  getCategoriesByUserController,
  updateCategoryController,
} from "@/main/config/dependencyInjection/categoryDependencyInjection";

export async function createCategory(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await createCategoryController.handle({
    body: { ...req.body, userId: req.userId },
  });
  res.status(statusCode).send(body);
}

export async function getCategoriesByUser(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await getCategoriesByUserController.handle({
    userId: req.userId,
  });
  res.status(statusCode).send(body);
}

export async function updateCategory(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await updateCategoryController.handle({
    params: { id: req.params.id },
    body: { ...req.body, userId: req.userId },
  });
  res.status(statusCode).send(body);
}
