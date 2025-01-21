import { ICategoryWithId } from "@/domain/entities/Category";

export interface CreateCategoryParams {
  name: string;
  userId: number;
}

export interface UpdateCategoryParams {
  id: number;
  name: string;
  userId: number;
}

export interface ICategoryRepository {
  createCategory(category: CreateCategoryParams): Promise<ICategoryWithId>;
  updateCategory(category: UpdateCategoryParams): Promise<ICategoryWithId>;
  findByName(name: string): Promise<ICategoryWithId | null>;
  findByUserId(userId: number): Promise<ICategoryWithId[]>;
  findByNameAndUserId(
    name: string,
    userId: number,
  ): Promise<ICategoryWithId | null>;
  findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<ICategoryWithId | null>;
}
