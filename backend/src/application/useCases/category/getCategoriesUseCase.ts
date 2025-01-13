import { GetCategoryByUserIdReturn } from "@/main/config/helpers/protocol/createCategoryProtocols";
import { ICategoryRepository } from "@/application/interfaces/domain/entities/category/IcategoryRepository";
import { IGetCategoriesByUserUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class GetCategoriesByUserUseCase implements IGetCategoriesByUserUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(userId: number): Promise<GetCategoryByUserIdReturn | string> {
    const categories = await this.categoryRepository.findByUserId(userId);

    const categoriesReturn = {
      categories: categories.map((category) => ({
        name: category.name,
      })),
    };

    return categoriesReturn;
  }
}
