import { beforeEach, describe, expect, it, vi } from "vitest";

import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { UpdateCategoryController } from "@/main/controllers/category/updateCategoryController";
import { UpdateCategoryParams } from "@/application/interfaces/domain/entities/category/IcategoryRepository";
import { UpdateCategoryUseCase } from "@/application/useCases/category/updateCategoryUseCase";

describe("UpdateCategoryController", () => {
  let updateCategoryController: UpdateCategoryController;
  let updateCategoryUseCase: UpdateCategoryUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase(
      inMemoryCategoryRepository,
    );
    updateCategoryController = new UpdateCategoryController(
      updateCategoryUseCase,
    );
  });

  it("should update a category and return a nice request response", async () => {
    // Arrange
    const categoryParams = { name: "Category to update", userId: 1 };
    const category =
      await inMemoryCategoryRepository.createCategory(categoryParams);
    const httpRequest: HttpRequest<UpdateCategoryParams> = {
      params: { id: category.id.toString() },
      body: {
        id: category.id,
        name: "Updated Category",
        userId: category.userId,
      },
    };

    // Act
    const httpResponse = await updateCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "Category updated successfully",
      category: {
        name: "Updated Category",
      },
    });
  });

  it("should return bad request if category ID is not provided", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateCategoryParams> = {
      params: {},
      body: { id: 1, name: "Updated Category", userId: 1 },
    };

    // Act
    const httpResponse = await updateCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Category not found");
  });

  it("should return bad request if category does not exist", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateCategoryParams> = {
      params: { id: "999" },
      body: { id: 999, name: "Non-existent Category", userId: 1 },
    };

    // Act
    const httpResponse = await updateCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Category not found");
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateCategoryParams> = {
      params: { id: "1" },
      body: { id: 1, name: "Updated Category", userId: 1 },
    };
    vi.spyOn(updateCategoryUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse = await updateCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
