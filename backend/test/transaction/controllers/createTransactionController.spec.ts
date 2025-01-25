import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreateTransactionController } from "@/main/controllers/transaction/createTransactionController";
import { CreateTransactionParamsWithCategoryName } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { CreateTransactionUseCase } from "@/application/useCases/transaction/createTransactionUseCase";
import { GetCategoryService } from "@/application/services/getCategoryService";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";

describe("CreateTransactionController", () => {
  let createTransactionController: CreateTransactionController;
  let createTransactionUseCase: CreateTransactionUseCase;
  let inMemoryTransactionRepository: InMemoryTransactionRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let getCategoryService: GetCategoryService;

  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    getCategoryService = new GetCategoryService(inMemoryCategoryRepository);
    createTransactionUseCase = new CreateTransactionUseCase(
      inMemoryTransactionRepository,
      getCategoryService,
    );
    createTransactionController = new CreateTransactionController(
      createTransactionUseCase,
    );
  });

  it("should create a transaction and return a created response", async () => {
    // Arrange
    const httpRequest: HttpRequest<CreateTransactionParamsWithCategoryName> = {
      body: {
        type: TransactionType.INCOME,
        amount: 1000,
        userId: 1,
        date: "2025-02-01",
      },
    };

    // Act
    const httpResponse = await createTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      message: "Transaction created successfully",
      transaction: {
        type: TransactionType.INCOME,
        amount: 1000,
      },
    });
  });

  it("should return bad request if validation fails", async () => {
    // Arrange
    const httpRequest: HttpRequest<CreateTransactionParamsWithCategoryName> = {
      body: {
        type: "INVALID_TYPE" as unknown as TransactionType,
        amount: 1000,
        userId: 1,
        date: "2025-02-01",
      },
    };

    // Act
    const httpResponse = await createTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe(
      "Invalid enum value. Expected 'INCOME' | 'EXPENSE', received 'INVALID_TYPE'",
    );
  });

  it("should return bad request if date format is incorrect", async () => {
    // Arrange
    const httpRequest: HttpRequest<CreateTransactionParamsWithCategoryName> = {
      body: {
        type: TransactionType.INCOME,
        amount: 1000,
        userId: 1,
        date: "01-02-2025",
      },
    };

    // Act
    const httpResponse = await createTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Date must be in the format YYYY-MM-DD");
  });

  it("should return bad request if data is empty", async () => {
    // Arrange
    const httpRequest: HttpRequest<CreateTransactionParamsWithCategoryName> = {
      body: {
        type: TransactionType.INCOME,
        amount: 1000,
        userId: 1,
        date: "",
      },
    };

    // Act
    const httpResponse = await createTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Date must be in the format YYYY-MM-DD");
  });

  it("should return bad request if category does not exist", async () => {
    // Arrange
    const httpRequest: HttpRequest<CreateTransactionParamsWithCategoryName> = {
      body: {
        type: TransactionType.INCOME,
        amount: 1000,
        userId: 1,
        categoryName: "Non-existent Category",
        date: "2025-02-01",
      },
    };

    // Act
    const httpResponse = await createTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Category not found");
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest: HttpRequest<CreateTransactionParamsWithCategoryName> = {
      body: {
        type: TransactionType.INCOME,
        amount: 1000,
        userId: 1,
        date: "2025-02-01",
      },
    };
    vi.spyOn(createTransactionUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse = await createTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
