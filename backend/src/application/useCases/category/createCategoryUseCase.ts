import {
  CreateCategoryParams,
  ICategoryRepository,
} from "@/application/interfaces/domain/entities/category/IcategoryRepository";

import { CreateCategoryReturn } from "@/main/config/helpers/protocol/category/createCategoryProtocols";
import { ICreateCategoryUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(
    params: CreateCategoryParams,
  ): Promise<CreateCategoryReturn | string> {
    const existingCategory = await this.categoryRepository.findByNameAndUserId(
      params.name,
      params.userId,
    );

    if (existingCategory) {
      return "Category already exists";
    }

    const newCategory = await this.categoryRepository.createCategory(params);

    return {
      category: {
        name: newCategory.name,
      },
    };
  }
}
