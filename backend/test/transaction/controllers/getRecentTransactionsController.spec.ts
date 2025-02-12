import { beforeEach, describe, expect, it, vi } from "vitest";

import { GetRecentTransactionsController } from "@/main/controllers/transaction/getRecentTransactionsController";
import { GetRecentTransactionsParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { GetRecentTransactionsUseCase } from "@/application/useCases/transaction/getRecentTransactionsUseCase";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";

describe("GetRecentTransactionsController", () => {
  let getRecentTransactionsController: GetRecentTransactionsController;
  let getRecentTransactionsUseCase: GetRecentTransactionsUseCase;
  let inMemoryTransactionRepository: InMemoryTransactionRepository;

  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    getRecentTransactionsUseCase = new GetRecentTransactionsUseCase(
      inMemoryTransactionRepository,
    );
    getRecentTransactionsController = new GetRecentTransactionsController(
      getRecentTransactionsUseCase,
    );
  });

  it("should return recent transactions successfully", async () => {
    // Arrange
    const userId = 1;
    const httpRequest: HttpRequest<GetRecentTransactionsParams> = {
      query: { limit: "2" },
      userId,
    };

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
      date: "2025-01-02T03:00:00Z",
    });

    await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 2000,
      description: "Description",
      userId,
      date: "2025-01-03T03:00:00Z",
    });

    const httpResponse =
      await getRecentTransactionsController.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "Recent transactions retrieved successfully",
      recent: {
        transaction: [
          {
            type: "INCOME",
            amount: 2000,
            description: "Description",
            categoryId: null,
            date: new Date("2025-01-03T03:00:00.000Z"),
          },
          {
            type: "EXPENSE",
            amount: 500,
            description: null,
            categoryId: null,
            date: new Date("2025-01-02T03:00:00.000Z"),
          },
        ],
      },
    });
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const userId = 1;
    const httpRequest: HttpRequest<GetRecentTransactionsParams> = {
      query: { limit: "1" },
      userId,
    };

    vi.spyOn(getRecentTransactionsUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse =
      await getRecentTransactionsController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
