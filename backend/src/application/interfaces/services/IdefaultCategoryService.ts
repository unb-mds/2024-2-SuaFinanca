export interface IDefaultCategoryService {
  createDefaultCategories(userId: number): Promise<void>;
}
