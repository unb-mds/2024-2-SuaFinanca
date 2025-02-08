import { vi, describe, it, beforeEach, expect } from "vitest";
import { UpdateTransactionController } from "@/main/controllers/transaction/updateTransactionController";
import { UpdateTransactionUseCase } from "@/application/useCases/transaction/updateTransactionUseCase";
import { InMemoryTransactionRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryTransactionRepository";
import { GetCategoryService } from "@/application/services/getCategoryService";
import { InMemoryCategoryRepository } from "@/infrastructure/database/inMemoryRepository/inMemoryCategoryRepository";
import { TransactionType } from "@/domain/entities/Transaction";
import { HttpRequest } from "@/main/config/helpers/protocol/protocols";
import { UpdateTransactionWithCategoryNameParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";

describe("UpdateTransactionController", () => {
  let updateTransactionController: UpdateTransactionController;
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
    updateTransactionController = new UpdateTransactionController(
      updateTransactionUseCase,
    );
  });

  it("should update a transaction and return a success response", async () => {
    // Arrange
    const transaction = await inMemoryTransactionRepository.createTransaction({
      type: TransactionType.INCOME,
      amount: 1000,
      userId: 1,
      date: "2025-02-01T03:00:00Z",
    });

    const httpRequest: HttpRequest<UpdateTransactionWithCategoryNameParams> = {
      params: { id: transaction.id.toString() },
      userId: transaction.userId,
      body: {
        id: transaction.id,
        type: TransactionType.EXPENSE,
        amount: 2000,
        userId: transaction.userId,
        date: "2025-02-15",
      },
    };

    // Act
    const httpResponse = await updateTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      message: "Transaction updated successfully",
      transaction: {
        type: TransactionType.EXPENSE,
        amount: 2000,
        categoryName: undefined,
        date: expect.any(Date),
      },
    });
  });

  it("should return bad request if validation fails", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateTransactionWithCategoryNameParams> = {
      params: { id: "1" },
      userId: 1,
      body: {
        id: 1,
        type: "INVALID_TYPE" as unknown as TransactionType,
        amount: 1000,
        userId: 1,
        date: "2025-02-01",
      },
    };

    // Act
    const httpResponse = await updateTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe(
      "Invalid enum value. Expected 'INCOME' | 'EXPENSE', received 'INVALID_TYPE'",
    );
  });

  it("should return bad request if transaction does not exist", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateTransactionWithCategoryNameParams> = {
      params: { id: "999" },
      userId: 1,
      body: {
        id: 999,
        type: TransactionType.EXPENSE,
        amount: 1000,
        userId: 1,
        date: "2025-02-01",
      },
    };

    // Act
    const httpResponse = await updateTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toBe("Transaction not found");
  });

  it("should return server error if an exception is thrown", async () => {
    // Arrange
    const httpRequest: HttpRequest<UpdateTransactionWithCategoryNameParams> = {
      params: { id: "1" },
      userId: 1,
      body: {
        id: 1,
        type: TransactionType.EXPENSE,
        amount: 1000,
        userId: 1,
        date: "2025-02-01",
      },
    };
    vi.spyOn(updateTransactionUseCase, "execute").mockRejectedValueOnce(
      new Error(""),
    );

    // Act
    const httpResponse = await updateTransactionController.handle(httpRequest);

    // Assert
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toBe("Something went wrong.");
  });
});
