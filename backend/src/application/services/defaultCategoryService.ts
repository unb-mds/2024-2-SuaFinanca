import { ICategoryRepository } from "../interfaces/domain/entities/category/IcategoryRepository";
import { IDefaultCategoryService } from "../interfaces/services/IdefaultCategoryService";

const defaultCategories = [
  { name: "Salário" },
  { name: "Transporte" },
  { name: "Alimentação" },
];

export class DefaultCategoryService implements IDefaultCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async createDefaultCategories(userId: number): Promise<void> {
    for (const category of defaultCategories) {
      await this.categoryRepository.createCategory({
        name: category.name,
        userId,
      });
    }
  }
}
