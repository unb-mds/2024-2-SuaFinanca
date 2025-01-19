import { ICategoryWithId } from "@/domain/entities/Category";

export interface CreateCategoryParams {
  name: string;
  userId: number;
}

export interface ICategoryRepository {
  createCategory(category: CreateCategoryParams): Promise<ICategoryWithId>;
  findByName(name: string): Promise<ICategoryWithId | null>;
  findByUserId(userId: number): Promise<ICategoryWithId[]>;
  findByNameAndUserId(
    name: string,
    userId: number,
  ): Promise<ICategoryWithId | null>;
  findByIdAndUserId(
    categoryId: number,
    userId: number,
  ): Promise<ICategoryWithId | null>;
  deleteCategory(categoryId: number): Promise<void>;
}
