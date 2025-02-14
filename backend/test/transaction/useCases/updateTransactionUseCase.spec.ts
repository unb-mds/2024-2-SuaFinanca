import { beforeEach, describe, expect, it } from "vitest";

import { GetCategoryService } from "@/application/services/getCategoryService";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";
import { UpdateTransactionUseCase } from "@/application/useCases/transaction/updateTransactionUseCase";

describe("UpdateTransactionUseCase", () => {
  let updateTransactionUseCase: UpdateTransactionUseCase;
  let inMemoryTransactionRepository: InMemoryTransactionRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let getCategoryService: GetCategoryService;

  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    getCategoryService = new GetCategoryService(inMemoryCategoryRepository);
    updateTransactionUseCase = new UpdateTransactionUseCase(
      inMemoryTransactionRepository,
      getCategoryService,
    );
  });

  it("should update a transaction successfully", async () => {
    // Arrange
    const userId = 1;
    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId,
      date: "2024-01-01T00:00:00Z",
    });

    const updateParams = {
      id: transaction.id,
      userId,
      type: TransactionType.EXPENSE,
      amount: 2000,
      date: "2024-02-01T00:00:00Z",
    };

    // Act
    const result = await updateTransactionUseCase.execute(updateParams);

    // Assert
    expect(result).toEqual({
      transaction: {
        type: TransactionType.EXPENSE,
        amount: 2000,
        date: new Date("2024-02-01T00:00:00Z"),
        categoryName: undefined,
      },
    });
  });

  it("should update a transaction with category", async () => {
    // Arrange
    const userId = 1;
    const category = await inMemoryCategoryRepository.createCategory({
      name: "Salary",
      userId,
    });
    await inMemoryCategoryRepository.createCategory({
      name: "Transport",
      userId,
    });

    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId,
      date: "2024-01-01T00:00:00Z",
      categoryId: category.id,
    });

    const updateParams = {
      id: transaction.id,
      userId,
      categoryName: "Transport",
    };

    // Act
    const result = await updateTransactionUseCase.execute(updateParams);

    // Assert
    expect(result).toEqual({
      transaction: {
        type: TransactionType.INCOME,
        amount: 1000,
        date: new Date("2024-01-01T00:00:00Z"),
        categoryName: "Transport",
      },
    });
  });

  it("should return 'Transaction not found' if transaction does not exist", async () => {
    // Arrange
    const updateParams = {
      id: 999,
      userId: 1,
      amount: 2000,
    };

    // Act
    const result = await updateTransactionUseCase.execute(updateParams);

    // Assert
    expect(result).toBe("Transaction not found");
  });

  it("should return 'Category not found' if category does not exist", async () => {
    // Arrange
    const userId = 1;
    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId,
      date: "2024-01-01T00:00:00Z",
    });

    const updateParams = {
      id: transaction.id,
      userId,
      categoryName: "Non-existent Category",
    };

    // Act
    const result = await updateTransactionUseCase.execute(updateParams);

    // Assert
    expect(result).toBe("Category not found");
  });

  it("should remove category when categoryName is null", async () => {
    // Arrange
    const userId = 1;
    const category = await inMemoryCategoryRepository.createCategory({
      name: "Salary",
      userId,
    });

    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId,
      date: "2024-01-01T00:00:00Z",
      categoryId: category.id,
    });

    const updateParams = {
      id: transaction.id,
      userId,
      categoryName: null,
    };

    // Act
    const result = await updateTransactionUseCase.execute(updateParams);

    // Assert
    expect(result).toEqual({
      transaction: {
        type: TransactionType.INCOME,
        amount: 1000,
        date: new Date("2024-01-01T00:00:00Z"),
      },
    });
  });

  it("should update a transaction with description", async () => {
    // Arrange
    const userId = 1;
    const category = await inMemoryCategoryRepository.createCategory({
      name: "Salary",
      userId,
    });
    await inMemoryCategoryRepository.createCategory({
      name: "Transport",
      userId,
    });

    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      description: "string",
      userId,
      date: "2024-01-01T00:00:00Z",
      categoryId: category.id,
    });

    const updateParams = {
      id: transaction.id,
      description: "description",
      userId,
      categoryName: "Transport",
    };

    // Act
    const result = await updateTransactionUseCase.execute(updateParams);

    // Assert
    expect(result).toEqual({
      transaction: {
        type: TransactionType.INCOME,
        amount: 1000,
        description: "description",
        date: new Date("2024-01-01T00:00:00Z"),
        categoryName: "Transport",
      },
    });
  });

  it("should remove the description when it is null", async () => {
    // Arrange
    const userId = 1;

    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      description: "description",
      userId,
      date: "2024-01-01T00:00:00Z",
    });

    const updateParams = {
      id: transaction.id,
      description: null,
      userId,
    };

    // Act
    const result = await updateTransactionUseCase.execute(updateParams);

    // Assert
    expect(result).toEqual({
      transaction: {
        type: TransactionType.INCOME,
        amount: 1000,
        date: new Date("2024-01-01T00:00:00Z"),
      },
    });
  });
});
