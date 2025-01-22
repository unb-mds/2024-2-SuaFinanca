import {
  CreateCategoryParams,
  ICategoryRepository,
  UpdateCategoryParams,
} from "@/application/interfaces/domain/entities/category/IcategoryRepository";

import { ICategoryWithId } from "@/domain/entities/Category";

export class InMemoryCategoryRepository implements ICategoryRepository {
  private currentId = 1;
  private categories: ICategoryWithId[] = [];

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

  async findByIdAndUserId(
    categoryId: number,
    userId: number,
  ): Promise<ICategoryWithId | null> {
    const category = this.categories.find(
      (category) => category.id === categoryId && category.userId === userId,
    );
    return category || null;
  }

  async updateCategory(
    category: UpdateCategoryParams,
  ): Promise<ICategoryWithId> {
    const index = this.categories.findIndex((cat) => cat.id === category.id);
    if (index === -1) {
      throw new Error("Category not found.");
    }
    this.categories[index] = { ...this.categories[index], ...category };
    return this.categories[index];
  }

  async deleteCategory(categoryId: number): Promise<void> {
    const index = this.categories.findIndex(
      (category) => category.id === categoryId,
    );
    if (index === -1) {
      throw new Error("Category not found.");
    }
    this.categories.splice(index, 1);
  }
}
