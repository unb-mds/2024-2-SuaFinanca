import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { UpdateCategoryUseCase } from "@/application/useCases/category/updateCategoryUseCase";

describe("UpdateCategoryUseCase", () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase(
      inMemoryCategoryRepository,
    );
  });

  it("should update a category if it exists", async () => {
    // Arrange
    const categoryParams = { name: "Category to update", userId: 1 };
    const category =
      await inMemoryCategoryRepository.createCategory(categoryParams);
    const updateParams = {
      id: category.id,
      name: "Updated Category",
      userId: category.userId,
    };

    // Act
    const result = await updateCategoryUseCase.execute(updateParams);

    // Assert
    expect(result).toEqual({
      category: {
        name: updateParams.name,
      },
    });
    const updatedCategory = await inMemoryCategoryRepository.findByIdAndUserId(
      category.id,
      category.userId,
    );
    expect(updatedCategory?.name).toBe(updateParams.name);
  });

  it("should return 'Category not found' if the category does not exist", async () => {
    // Arrange
    const updateParams = { id: 999, name: "Non-existent Category", userId: 1 };

    // Act
    const result = await updateCategoryUseCase.execute(updateParams);

    // Assert
    expect(result).toBe("Category not found");
  });

  it("should return 'Category not found' if the category does not belong to the user", async () => {
    // Arrange
    const categoryParams = { name: "Category to update", userId: 1 };
    const category =
      await inMemoryCategoryRepository.createCategory(categoryParams);
    const updateParams = {
      id: category.id,
      name: "Updated Category",
      userId: 2,
    };

    // Act
    const result = await updateCategoryUseCase.execute(updateParams);

    // Assert
    expect(result).toBe("Category not found");
  });
});
