import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTransactionUseCase } from "@/application/useCases/transaction/deleteTransactionUseCase";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { GetCategoryService } from "@/application/services/getCategoryService";
import { TransactionType } from "@/domain/entities/Transaction";

describe("DeleteTransactionUseCase", () => {
  let deleteTransactionUseCase: DeleteTransactionUseCase;
  let inMemoryTransactionRepository: InMemoryTransactionRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let getCategoryService: GetCategoryService;

  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    getCategoryService = new GetCategoryService(inMemoryCategoryRepository);
    deleteTransactionUseCase = new DeleteTransactionUseCase(
      inMemoryTransactionRepository,
      getCategoryService,
    );
  });

  it("should delete a transaction without category", async () => {
    // Arrange
    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
      date: "2025-02-01T03:00:00Z",
    });

    // Act
    const result = await deleteTransactionUseCase.execute(
      transaction.id,
      transaction.userId,
    );

    // Assert
    expect(result).toEqual({
      transaction: {
        type: TransactionType.INCOME,
        amount: 1000,
        categoryName: undefined,
        date: new Date("2025-02-01T03:00:00Z"),
      },
    });

    const deletedTransaction =
      await inMemoryTransactionRepository.findByIdAndUserId(
        transaction.id,
        transaction.userId,
      );
    expect(deletedTransaction).toBeNull();
  });

  it("should delete a transaction with category", async () => {
    // Arrange
    const category = await inMemoryCategoryRepository.createCategory({
      name: "Salary",
      userId: 1,
    });

    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
      categoryId: category.id,
      date: "2025-02-01T03:00:00Z",
    });

    // Act
    const result = await deleteTransactionUseCase.execute(
      transaction.id,
      transaction.userId,
    );

    // Assert
    expect(result).toEqual({
      transaction: {
        type: TransactionType.INCOME,
        amount: 1000,
        categoryName: "Salary",
        date: new Date("2025-02-01T03:00:00Z"),
      },
    });
  });

  it("should return 'Transaction not found' if transaction does not exist", async () => {
    // Act
    const result = await deleteTransactionUseCase.execute(999, 1);

    // Assert
    expect(result).toBe("Transaction not found");
  });

  it("should return 'Transaction not found' if transaction does not belong to user", async () => {
    // Arrange
    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
      date: "2025-02-01T03:00:00Z",
    });

    // Act
    const result = await deleteTransactionUseCase.execute(transaction.id, 2);

    // Assert
    expect(result).toBe("Transaction not found");
  });

  it("should return 'Category not found' if associated category was deleted", async () => {
    // Arrange
    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
      categoryId: 999, // Non-existent category
      date: "2025-02-01T03:00:00Z",
    });

    // Act
    const result = await deleteTransactionUseCase.execute(
      transaction.id,
      transaction.userId,
    );

    // Assert
    expect(result).toBe("Category not found");
  });
});
