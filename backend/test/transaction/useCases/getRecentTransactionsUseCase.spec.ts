import { beforeEach, describe, expect, it } from "vitest";

import { GetCategoryService } from "@/application/services/getCategoryService";
import { GetRecentTransactionsUseCase } from "@/application/useCases/transaction/getRecentTransactionsUseCase";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";

describe("GetRecentTransactionsUseCase", () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let inMemoryTransactionRepository: InMemoryTransactionRepository;
  let getCategoryService: GetCategoryService;
  let getRecentTransactionsUseCase: GetRecentTransactionsUseCase;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    getCategoryService = new GetCategoryService(inMemoryCategoryRepository);
    getRecentTransactionsUseCase = new GetRecentTransactionsUseCase(
      inMemoryTransactionRepository,
      getCategoryService,
    );
  });

  it("should return recent transactions for a user", async () => {
    // Arrange
    const userId = 1;
    const limit = 2;

    const category = await inMemoryCategoryRepository.createCategory({
      name: "Salary",
      userId,
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 2000,
      userId,
      date: "2025-01-01T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.EXPENSE,
      amount: 500,
      userId,
      description: "Description",
      date: "2025-01-02T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.EXPENSE,
      amount: 4000,
      categoryId: category.id,
      userId,
      date: "2025-01-03T03:00:00Z",
    });

    // Act
    const result = await getRecentTransactionsUseCase.execute({
      userId,
      limit,
    });

    // Assert
    expect(result).toEqual({
      recent: {
        transaction: [
          {
            id: 3,
            userId: 1,
            amount: 4000,
            categoryId: category.id,
            categoryName: "Salary",
            date: new Date("2025-01-03T03:00:00Z"),
            type: TransactionType.EXPENSE,
          },
          {
            id: 2,
            userId: 1,
            amount: 500,
            description: "Description",
            categoryName: null,
            date: new Date("2025-01-02T03:00:00.000Z"),
            type: TransactionType.EXPENSE,
          },
        ],
      },
    });
  });

  it("should return an empty array if no transactions are found", async () => {
    // Arrange
    const userId = 1;
    const limit = 2;

    // Act
    const result = await getRecentTransactionsUseCase.execute({
      userId,
      limit,
    });

    // Assert
    expect(result.recent.transaction).toHaveLength(0);
  });
});
