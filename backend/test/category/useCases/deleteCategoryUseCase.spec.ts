import { beforeEach, describe, expect, it } from "vitest";

import { DeleteCategoryUseCase } from "@/application/useCases/category/deleteCategoryUseCase";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";

describe("DeleteCategoryUseCase", () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      inMemoryCategoryRepository,
    );
  });

  it("should delete a category if it exists", async () => {
    // Arrange
    const categoryParams = { name: "Category to delete", userId: 1 };
    const category =
      await inMemoryCategoryRepository.createCategory(categoryParams);

    // Act
    const result = await deleteCategoryUseCase.execute(
      category.id,
      category.userId,
    );

    // Assert
    expect(result).toBeUndefined();
    const deletedCategory = await inMemoryCategoryRepository.findByIdAndUserId(
      category.id,
      category.userId,
    );
    expect(deletedCategory).toBeNull();
  });

  it("should return 'Category not found' if the category does not exist", async () => {
    // Act
    const result = await deleteCategoryUseCase.execute(999, 1);

    // Assert
    expect(result).toBe("Category not found");
  });

  it("should return 'Category not found' if the category does not belong to the user", async () => {
    // Arrange
    const categoryParams = { name: "Category to delete", userId: 1 };
    const category =
      await inMemoryCategoryRepository.createCategory(categoryParams);

    // Act
    const result = await deleteCategoryUseCase.execute(category.id, 2);

    // Assert
    expect(result).toBe("Category not found");
  });
});
