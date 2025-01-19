import { ICategoryWithId } from "@/domain/entities/Category";

export interface IGetCategoryService {
  getCategoryByNameAndUserId(
    name: string,
    userId: number,
  ): Promise<ICategoryWithId | null>;
}
