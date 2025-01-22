import { beforeEach, describe, expect, it, vi } from "vitest";

import { DeleteCategoryController } from "@/main/controllers/category/deleteCategoryController";
import { DeleteCategoryUseCase } from "@/application/useCases/category/deleteCategoryUseCase";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";

describe("DeleteCategoryController", () => {
  let deleteCategoryController: DeleteCategoryController;
  let deleteCategoryUseCase: DeleteCategoryUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      inMemoryCategoryRepository,
    );
    deleteCategoryController = new DeleteCategoryController(
      deleteCategoryUseCase,
    );
  });

  it("should delete a category and return a nice request response", async () => {
    // Arrange
    const categoryParams = { name: "Category to delete", userId: 1 };
    const category =
      await inMemoryCategoryRepository.createCategory(categoryParams);
    const httpRequest: HttpRequest<string> = {
      params: { id: category.id.toString() },
      userId: category.userId,
    };

    // Act
    const httpResponse = await deleteCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toBe("Category successfully deleted");
  });

  it("should return bad request if category ID is not provided", async () => {
    // Arrange
    const httpRequest: HttpRequest<string> = {
      params: {},
      userId: 1,
    };

    // Act
    const httpResponse = await deleteCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Category ID is required");
  });

  it("should return bad request if category does not exist", async () => {
    // Arrange
    const httpRequest: HttpRequest<string> = {
      params: { id: "999" },
      userId: 1,
    };

    // Act
    const httpResponse = await deleteCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Category not found");
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest: HttpRequest<string> = {
      params: { id: "1" },
      userId: 1,
    };
    vi.spyOn(deleteCategoryUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse = await deleteCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
