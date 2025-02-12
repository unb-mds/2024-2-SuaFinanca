import { beforeEach, describe, expect, it } from "vitest";

import { GetRecentTransactionsUseCase } from "@/application/useCases/transaction/getRecentTransactionsUseCase";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";

describe("GetRecentTransactionsUseCase", () => {
  let getRecentTransactionsUseCase: GetRecentTransactionsUseCase;
  let inMemoryTransactionRepository: InMemoryTransactionRepository;

  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    getRecentTransactionsUseCase = new GetRecentTransactionsUseCase(
      inMemoryTransactionRepository,
    );
  });

  it("should return recent transactions for a user", async () => {
    // Arrange
    const userId = 1;
    const limit = 2;

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 2000,
      userId,
      date: "2025-02-01T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.EXPENSE,
      amount: 500,
      userId,
      description: "Description",
      date: "2025-02-10T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.EXPENSE,
      amount: 4000,
      userId,
      date: "2025-02-02T03:00:00Z",
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
            id: 2,
            userId: 1,
            amount: 500,
            description: "Description",
            date: new Date("2025-02-10T03:00:00.000Z"),
            type: TransactionType.EXPENSE,
          },
          {
            id: 3,
            userId: 1,
            amount: 4000,
            date: new Date("2025-02-02T03:00:00Z"),
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
