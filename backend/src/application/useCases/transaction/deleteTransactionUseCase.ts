import { DeleteTransactionReturn } from "@/main/config/helpers/protocol/transaction/deleteTransactionProtocols";
import { IDeleteTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { IGetCategoryService } from "@/application/interfaces/services/IgetCategoryService";
import { ITransactionRepository } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";

export class DeleteTransactionUseCase implements IDeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly categoryService: IGetCategoryService,
  ) {}

  async execute(
    transactionId: number,
    userId: number,
  ): Promise<DeleteTransactionReturn | string> {
    const transaction = await this.transactionRepository.findByIdAndUserId(
      transactionId,
      userId,
    );

    if (!transaction) {
      return "Transaction not found";
    }

    await this.transactionRepository.deleteTransaction(transactionId, userId);

    let categoryName: string | undefined;

    if (transaction.categoryId) {
      const category = await this.categoryService.getCategoryByIdAndUserId(
        transaction.categoryId,
        userId,
      );

      if (!category) {
        return "Category not found";
      }

      categoryName = category.name;
    }

    return {
      transaction: {
        type: transaction.type,
        amount: transaction.amount,
        categoryName: categoryName ?? undefined,
        date: transaction.date,
      },
    };
  }
}
