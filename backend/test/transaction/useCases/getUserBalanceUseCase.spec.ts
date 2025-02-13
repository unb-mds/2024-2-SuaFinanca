import { beforeEach, describe, expect, it } from "vitest";

import { GetUserBalanceUseCase } from "@/application/useCases/transaction/getUserBalanceUseCase";
import { IUserWithId } from "@/domain/entities/User";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";

describe("GetUserBalanceUseCase", () => {
  let getUserBalanceUseCase: GetUserBalanceUseCase;
  let inMemoryTransactionRepository: InMemoryTransactionRepository;
  let inMemoryAuthUserRepository: InMemoryAuthUserRepository;

  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    inMemoryAuthUserRepository = new InMemoryAuthUserRepository();
    getUserBalanceUseCase = new GetUserBalanceUseCase(
      inMemoryTransactionRepository,
      inMemoryAuthUserRepository,
    );
  });

  it("should return the correct balance for a user", async () => {
    // Arrange
    const userId = 1;
    const month = 1; // February (0-based index)
    const year = 2025;

    const user: IUserWithId = {
      id: userId,
      balance: 1500,
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    };

    await inMemoryAuthUserRepository.createUser(user);

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 2000,
      description: "Description",
      userId,
      date: "2025-02-01T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.EXPENSE,
      amount: 500,
      description: "Description",
      userId,
      date: "2025-02-10T03:00:00Z",
    });

    // Act
    const result = await getUserBalanceUseCase.execute({ userId, month, year });

    // Assert
    expect(result).toEqual({
      balance: {
        balance: 1500,
        totalIncome: 2000,
        totalExpense: 500,
        incomeTransactions: [
          {
            id: 1,
            userId: 1,
            amount: 2000,
            description: "Description",
            date: new Date("2025-02-01T03:00:00.000Z"),
            type: TransactionType.INCOME,
          },
        ],
        expenseTransactions: [
          {
            id: 2,
            userId: 1,
            amount: 500,
            description: "Description",
            date: new Date("2025-02-10T03:00:00.000Z"),
            type: TransactionType.EXPENSE,
          },
        ],
      },
    });
  });

  it("should return zero balance if no transactions are found", async () => {
    // Arrange
    const userId = 1;
    const month = 1; // February (0-based index)
    const year = 2025;

    const user: IUserWithId = {
      id: userId,
      balance: 0,
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    };

    await inMemoryAuthUserRepository.createUser(user);

    // Act
    const result = await getUserBalanceUseCase.execute({ userId, month, year });

    // Assert
    expect(result).toEqual({
      balance: {
        balance: 0,
        totalIncome: 0,
        totalExpense: 0,
        incomeTransactions: [
          // No transactions
        ],
        expenseTransactions: [
          // No transactions
        ],
      },
    });
  });

  it("should return the correct balance for multiple transactions", async () => {
    // Arrange
    const userId = 1;
    const month = 1; // February (0-based index)
    const year = 2025;

    const user: IUserWithId = {
      id: userId,
      balance: 1000,
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    };

    await inMemoryAuthUserRepository.createUser(user);

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      description: "Description",
      userId,
      date: "2025-02-01T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 500,
      userId,
      date: "2025-02-05T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.EXPENSE,
      amount: 300,
      description: "Description",
      userId,
      date: "2025-02-10T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.EXPENSE,
      amount: 200,
      userId,
      date: "2025-02-15T03:00:00Z",
    });

    // Act
    const result = await getUserBalanceUseCase.execute({ userId, month, year });

    // Assert
    expect(result).toEqual({
      balance: {
        balance: 1000,
        totalIncome: 1500,
        totalExpense: 500,
        incomeTransactions: [
          {
            id: 1,
            userId: 1,
            amount: 1000,
            description: "Description",
            date: new Date("2025-02-01T03:00:00.000Z"),
            type: TransactionType.INCOME,
          },
          {
            id: 2,
            userId: 1,
            amount: 500,
            date: new Date("2025-02-05T03:00:00.000Z"),
            type: TransactionType.INCOME,
          },
        ],
        expenseTransactions: [
          {
            id: 3,
            userId: 1,
            amount: 300,
            description: "Description",
            date: new Date("2025-02-10T03:00:00.000Z"),
            type: TransactionType.EXPENSE,
          },
          {
            id: 4,
            userId: 1,
            amount: 200,
            date: new Date("2025-02-15T03:00:00.000Z"),
            type: TransactionType.EXPENSE,
          },
        ],
      },
    });
  });
});
