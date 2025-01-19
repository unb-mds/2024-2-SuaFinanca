import { beforeEach, describe, expect, it } from "vitest";

import { CreateCategoryUseCase } from "@/application/useCases/category/createCategoryUseCase";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";

describe("CreateCategoryUseCase", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoryRepository,
    );
  });

  it("should create a new category if it does not exist", async () => {
    // Arrange
    const categoryParams = {
      name: "New Category",
      userId: 1,
    };

    // Act
    const result = await createCategoryUseCase.execute(categoryParams);

    // Assert
    expect(result).toEqual({
      category: {
        name: categoryParams.name,
      },
    });
  });

  it("should return 'Category already exists' if the category already exists", async () => {
    // Arrange
    const categoryParams = {
      name: "Existing Category",
      userId: 1,
    };
    await createCategoryUseCase.execute(categoryParams);

    // Act
    const result = await createCategoryUseCase.execute(categoryParams);

    // Assert
    expect(result).toBe("Category already exists");
  });
});
