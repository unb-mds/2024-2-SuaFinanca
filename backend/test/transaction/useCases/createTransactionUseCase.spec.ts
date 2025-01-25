import { beforeEach, describe, expect, it } from "vitest";

import { CreateTransactionParamsWithCategoryName } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { CreateTransactionUseCase } from "@/application/useCases/transaction/createTransactionUseCase";
import { GetCategoryService } from "@/application/services/getCategoryService";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";

describe("CreateTransactionUseCase", () => {
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
  });

  it("should create a transaction without category", async () => {
    // Arrange
    const transactionParams: CreateTransactionParamsWithCategoryName = {
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
    };

    // Act
    const result = await createTransactionUseCase.execute(transactionParams);

    // Assert
    expect(result).toEqual({
      transaction: {
        type: transactionParams.type,
        amount: transactionParams.amount,
      },
    });
  });

  it("should create a transaction with an existing category", async () => {
    // Arrange
    const categoryParams = { name: "Salary", userId: 1 };
    await inMemoryCategoryRepository.createCategory(categoryParams);
    const transactionParams: CreateTransactionParamsWithCategoryName = {
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
      categoryName: "Salary",
    };

    // Act
    const result = await createTransactionUseCase.execute(transactionParams);

    // Assert
    expect(result).toEqual({
      transaction: {
        type: transactionParams.type,
        amount: transactionParams.amount,
      },
    });
  });

  it("should return 'Category not found' if the category does not exist", async () => {
    // Arrange
    const transactionParams: CreateTransactionParamsWithCategoryName = {
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
      categoryName: "Non-existent Category",
    };

    // Act
    const result = await createTransactionUseCase.execute(transactionParams);

    // Assert
    expect(result).toBe("Category not found");
  });
});
