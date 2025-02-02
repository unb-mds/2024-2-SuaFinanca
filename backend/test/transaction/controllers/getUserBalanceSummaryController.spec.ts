import { beforeEach, describe, expect, it, vi } from "vitest";

import { GetUserBalanceParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { GetUserBalanceSummaryController } from "@/main/controllers/transaction/getUserBalanceSummaryController";
import { GetUserBalanceUseCase } from "@/application/useCases/transaction/getUserBalanceUseCase";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { IUserWithId } from "@/domain/entities/User";
import { InMemoryAuthUserRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryAuthUserRepository";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";

describe("GetUserBalanceController", () => {
  let getUserBalanceSummaryController: GetUserBalanceSummaryController;
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
    getUserBalanceSummaryController = new GetUserBalanceSummaryController(
      getUserBalanceUseCase,
    );
  });

  it("should return user balance successfully", async () => {
    // Arrange
    const userId = 1;
    const httpRequest: HttpRequest<GetUserBalanceParams> = {
      query: { month: "2", year: "2025" },
      userId,
    };

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
      userId,
      date: "2025-02-01T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.EXPENSE,
      amount: 500,
      userId,
      date: "2025-02-10T03:00:00Z",
    });

    // Act
    const httpResponse =
      await getUserBalanceSummaryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "User transactions successfully retrieved",
      summary: {
        incomeTransactions: [
          {
            type: "INCOME",
            categoryId: null,
            amount: 2000,
            date: new Date("2025-02-01T03:00:00.000Z"),
          },
        ],
        expenseTransactions: [
          {
            type: "EXPENSE",
            categoryId: null,
            amount: 500,
            date: new Date("2025-02-10T03:00:00.000Z"),
          },
        ],
      },
    });
  });

  it("should return zero balance if no transactions are found", async () => {
    // Arrange
    const userId = 1;
    const httpRequest: HttpRequest<GetUserBalanceParams> = {
      query: { month: "2", year: "2025" },
      userId,
    };

    const user: IUserWithId = {
      id: userId,
      balance: 0,
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    };

    await inMemoryAuthUserRepository.createUser(user);

    // Act
    const httpResponse =
      await getUserBalanceSummaryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "User transactions successfully retrieved",
      summary: {
        incomeTransactions: [],
        expenseTransactions: [],
      },
    });
  });

  it("should return the correct balance for multiple transactions", async () => {
    // Arrange
    const userId = 1;
    const httpRequest: HttpRequest<GetUserBalanceParams> = {
      query: { month: "2", year: "2025" },
      userId,
    };

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
    const httpResponse =
      await getUserBalanceSummaryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "User transactions successfully retrieved",
      summary: {
        incomeTransactions: [
          {
            type: "INCOME",
            categoryId: null,
            amount: 1000,
            date: new Date("2025-02-01T03:00:00.000Z"),
          },
          {
            type: "INCOME",
            categoryId: null,
            amount: 500,
            date: new Date("2025-02-05T03:00:00.000Z"),
          },
        ],
        expenseTransactions: [
          {
            type: "EXPENSE",
            categoryId: null,
            amount: 300,
            date: new Date("2025-02-10T03:00:00.000Z"),
          },
          {
            type: "EXPENSE",
            categoryId: null,
            amount: 200,
            date: new Date("2025-02-15T03:00:00.000Z"),
          },
        ],
      },
    });
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest: HttpRequest<GetUserBalanceParams> = {
      query: { month: "2", year: "2025" },
      userId: 1,
    };
    vi.spyOn(getUserBalanceUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse =
      await getUserBalanceSummaryController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
