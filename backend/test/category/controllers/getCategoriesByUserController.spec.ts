import { beforeEach, describe, expect, it, vi } from "vitest";

import { GetCategoriesByUserController } from "@/main/controllers/category/getCategoriesByUserController";
import { GetCategoriesByUserUseCase } from "@/application/useCases/category/getCategoriesUseCase";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";

describe("GetCategoriesByUserController", () => {
  let getCategoriesByUserController: GetCategoriesByUserController;
  let getCategoriesByUserUseCase: GetCategoriesByUserUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    getCategoriesByUserUseCase = new GetCategoriesByUserUseCase(
      inMemoryCategoryRepository,
    );
    getCategoriesByUserController = new GetCategoriesByUserController(
      getCategoriesByUserUseCase,
    );
  });

  it("should return categories for a valid user ID", async () => {
    // Arrange
    const httpRequest = {
      userId: 1,
    };

    await inMemoryCategoryRepository.createCategory({
      name: "Category 1",
      userId: 1,
    });

    // Act
    const httpResponse =
      await getCategoriesByUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "Category found successfully",
      category: [{ name: "Category 1" }],
    });
  });

  it("should return bad request if user ID is not provided", async () => {
    // Arrange
    const httpRequest = {};

    // Act
    const httpResponse =
      await getCategoriesByUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("User ID is required");
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest = {
      userId: 1,
    };
    vi.spyOn(getCategoriesByUserUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse =
      await getCategoriesByUserController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
});
