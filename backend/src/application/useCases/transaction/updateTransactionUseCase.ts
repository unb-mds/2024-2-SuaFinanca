import {
  ITransactionRepository,
  UpdateTransactionWithCategoryNameParams,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";

import { IGetCategoryService } from "@/application/interfaces/services/IgetCategoryService";
import { IUpdateTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { UpdateTransactionReturn } from "@/main/config/helpers/protocol/transaction/updateTransactionProtocols";

export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly categoryService: IGetCategoryService,
  ) {}

  async execute(
    params: UpdateTransactionWithCategoryNameParams,
  ): Promise<UpdateTransactionReturn | string> {
    const existingTransaction =
      await this.transactionRepository.findByIdAndUserId(
        params.id,
        params.userId,
      );

    if (!existingTransaction) {
      return "Transaction not found";
    }

    let categoryId = existingTransaction.categoryId;

    if (params.categoryName !== undefined) {
      if (params.categoryName === null) {
        categoryId = null;
      } else {
        const category = await this.categoryService.getCategoryByNameAndUserId(
          params.categoryName,
          params.userId,
        );

        if (!category) {
          return "Category not found";
        }

        categoryId = category.id;
      }
    }

    const updatedTransaction =
      await this.transactionRepository.updateTransaction({
        id: params.id,
        userId: params.userId,
        type: params.type ?? existingTransaction.type,
        amount: params.amount ?? existingTransaction.amount,
        categoryId,
        date: params.date ?? existingTransaction.date.toISOString(),
      });

    let categoryName: string | undefined;

    if (updatedTransaction.categoryId) {
      const category = await this.categoryService.getCategoryByIdAndUserId(
        updatedTransaction.categoryId,
        updatedTransaction.userId,
      );

      if (!category) {
        return "Category not found";
      }

      categoryName = category.name;
    }

    return {
      transaction: {
        type: updatedTransaction.type,
        amount: updatedTransaction.amount,
        categoryName: categoryName ?? undefined,
        date: updatedTransaction.date,
      },
    };
  }
}
