import { ICategoryRepository } from "@/application/interfaces/domain/entities/category/IcategoryRepository";
import { IGetCategoryService } from "../interfaces/services/IgetCategoryService";

export class GetCategoryService implements IGetCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async getCategoryByNameAndUserId(name: string, userId: number) {
    return this.categoryRepository.findByNameAndUserId(name, userId);
  }
}
