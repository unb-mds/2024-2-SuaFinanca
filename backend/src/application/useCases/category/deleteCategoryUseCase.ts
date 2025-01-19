import { ICategoryRepository } from "@/application/interfaces/domain/entities/category/IcategoryRepository";
import { IDeleteCategoryUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(categoryId: number, userId: number): Promise<void | string> {
    const category = await this.categoryRepository.findByIdAndUserId(
      categoryId,
      userId,
    );

    if (!category) {
      return "Category not found";
    }

    await this.categoryRepository.deleteCategory(categoryId);
  }
}
