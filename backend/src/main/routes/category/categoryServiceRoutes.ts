import { Request, Response } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesByUserController,
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

export async function deleteCategory(
  req: Request,
  res: Response,
): Promise<void> {
  const { body, statusCode } = await deleteCategoryController.handle({
    params: req.params,
    userId: req.userId,
  });
  res.status(statusCode).send(body);
}
