import { vi, describe, it, beforeEach, expect } from "vitest";
import { DeleteTransactionController } from "@/main/controllers/transaction/deleteTransactionController";
import { DeleteTransactionUseCase } from "@/application/useCases/transaction/deleteTransactionUseCase";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { GetCategoryService } from "@/application/services/getCategoryService";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { TransactionType } from "@/domain/entities/Transaction";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";

describe("DeleteTransactionController", () => {
  let deleteTransactionController: DeleteTransactionController;
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
    deleteTransactionController = new DeleteTransactionController(
      deleteTransactionUseCase,
    );
  });

  it("should delete a transaction and return a success response", async () => {
    // Arrange
    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
      date: "2025-02-01T03:00:00Z",
    });

    const httpRequest: HttpRequest<unknown> = {
      params: { id: transaction.id.toString() },
      userId: transaction.userId,
    };

    // Act
    const httpResponse = await deleteTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "Transaction successfully deleted",
      transaction: {
        type: transaction.type,
        amount: transaction.amount,
        categoryName: undefined,
        date: transaction.date,
      },
    });
  });

  it("should return bad request if transaction ID is not provided", async () => {
    // Arrange
    const httpRequest: HttpRequest<unknown> = {
      params: {},
      userId: 1,
    };

    // Act
    const httpResponse = await deleteTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Transaction ID is required");
  });

  it("should return bad request if transaction does not exist", async () => {
    // Arrange
    const httpRequest: HttpRequest<unknown> = {
      params: { id: "999" },
      userId: 1,
    };

    // Act
    const httpResponse = await deleteTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Transaction not found");
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest: HttpRequest<unknown> = {
      params: { id: "1" },
      userId: 1,
    };
    vi.spyOn(deleteTransactionUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse = await deleteTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
