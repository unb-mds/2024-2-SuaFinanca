import { beforeEach, describe, expect, it } from "vitest";

import { GetCategoriesByUserUseCase } from "@/application/useCases/category/getCategoriesUseCase";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";

describe("GetCategoriesByUserUseCase", () => {
  let getCategoriesByUserUseCase: GetCategoriesByUserUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    getCategoriesByUserUseCase = new GetCategoriesByUserUseCase(
      inMemoryCategoryRepository,
    );
  });

  it("should return categories for a valid user ID", async () => {
    // Arrange
    const userId = 1;
    await inMemoryCategoryRepository.createCategory({
      name: "Category 1",
      userId,
    });

    // Act
    const result = await getCategoriesByUserUseCase.execute(userId);

    // Assert
    expect(result).toEqual({
      categories: [{ name: "Category 1" }],
    });
  });

  it("should return an empty array if no categories are found for the user", async () => {
    // Arrange
    const userId = 1;

    // Act
    const result = await getCategoriesByUserUseCase.execute(userId);

    // Assert
    expect(result).toEqual({
      categories: [],
    });
  });
});
