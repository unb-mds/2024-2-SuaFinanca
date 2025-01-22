import {
  ICategoryRepository,
  UpdateCategoryParams,
} from "@/application/interfaces/domain/entities/category/IcategoryRepository";

import { IUpdateCategoryUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { UpdateCategoryReturn } from "@/main/config/helpers/protocol/category/updateCategoryProtocols";

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(
    params: UpdateCategoryParams,
  ): Promise<UpdateCategoryReturn | string> {
    const existingCategory = await this.categoryRepository.findByIdAndUserId(
      params.id,
      params.userId,
    );

    if (!existingCategory) {
      return "Category not found";
    }

    const updatedCategory =
      await this.categoryRepository.updateCategory(params);

    return {
      category: {
        name: updatedCategory.name,
      },
    };
  }
}
