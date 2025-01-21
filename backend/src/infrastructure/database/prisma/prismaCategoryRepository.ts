import {
  CreateCategoryParams,
  ICategoryRepository,
  UpdateCategoryParams,
} from "@/application/interfaces/domain/entities/category/IcategoryRepository";

import { ICategoryWithId } from "@/domain/entities/Category";
import { prisma } from "@/main/config/database/prisma";

export class PrismaCategoryRepository implements ICategoryRepository {
  async createCategory(params: CreateCategoryParams): Promise<ICategoryWithId> {
    const newCategory = await prisma.category.create({
      data: {
        name: params.name,
        userId: params.userId,
      },
    });
    return newCategory;
  }

  async updateCategory(params: UpdateCategoryParams): Promise<ICategoryWithId> {
    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: params.name,
      },
    });
    return updatedCategory;
  }

  async findByName(name: string): Promise<ICategoryWithId | null> {
    const category = await prisma.category.findFirst({
      where: { name },
    });
    return category;
  }

  async findByUserId(userId: number): Promise<ICategoryWithId[]> {
    const categories = await prisma.category.findMany({
      where: { userId },
    });
    return categories;
  }

  async findByNameAndUserId(
    name: string,
    userId: number,
  ): Promise<ICategoryWithId | null> {
    const category = await prisma.category.findFirst({
      where: {
        name,
        userId,
      },
    });
    return category;
  }

  async findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<ICategoryWithId | null> {
    const category = await prisma.category.findFirst({
      where: { id, userId },
    });
    return category;
  }
}
