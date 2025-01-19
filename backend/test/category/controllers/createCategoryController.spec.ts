import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreateCategoryController } from "@/main/controllers/category/createCategoryController";
import { CreateCategoryUseCase } from "@/application/useCases/category/createCategoryUseCase";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";

describe("CreateCategoryController", () => {
  let createCategoryController: CreateCategoryController;
  let createCategoryUseCase: CreateCategoryUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoryRepository,
    );
    createCategoryController = new CreateCategoryController(
      createCategoryUseCase,
    );
  });

  it("should create a category and return a created response", async () => {
    // Arrange
    const httpRequest = {
      body: {
        name: "New Category",
        userId: 1,
      },
    };

    // Act
    const httpResponse = await createCategoryController.handle(httpRequest);

    const responseBody = {
      message: "Category created successfully",
      category: {
        name: httpRequest.body.name,
      },
    };

    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(responseBody);
  });

  it("should return a bad request when validation fails", async () => {
    // Arrange
    const httpRequest = {
      body: {
        name: "",
        userId: 1,
      },
    };

    // Act
    const httpResponse = await createCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("Name cannot be empty");
  });

  it("should return 'Category already exists' if the category already exists", async () => {
    // Arrange
    const httpRequest = {
      body: {
        name: "Existing Category",
        userId: 1,
      },
    };
    await createCategoryController.handle(httpRequest);

    // Act
    const httpResponse = await createCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual("Category already exists");
  });

  it("should return a server error if an error was thrown", async () => {
    // Arrange
    const httpRequest = {
      body: {
        name: "New Category",
        userId: 1,
      },
    };
    vi.spyOn(createCategoryUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse = await createCategoryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Something went wrong.");
  });
});
