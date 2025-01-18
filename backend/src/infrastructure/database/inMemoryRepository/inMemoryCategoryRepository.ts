import {
  CreateCategoryParams,
  ICategoryRepository,
} from "@/application/interfaces/domain/entities/category/IcategoryRepository";

import { ICategoryWithId } from "@/domain/entities/Category";

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: ICategoryWithId[] = [];
  private currentId = 1;

  async createCategory(params: CreateCategoryParams): Promise<ICategoryWithId> {
    const newCategory: ICategoryWithId = {
      id: this.currentId++,
      ...params,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async findByName(name: string): Promise<ICategoryWithId | null> {
    const category = this.categories.find((category) => category.name === name);
    return category || null;
  }

  async findByUserId(userId: number): Promise<ICategoryWithId[]> {
    return this.categories.filter((category) => category.userId === userId);
  }

  async findByNameAndUserId(
    name: string,
    userId: number,
  ): Promise<ICategoryWithId | null> {
    const category = this.categories.find(
      (category) => category.name === name && category.userId === userId,
    );
    return category || null;
  }
}
