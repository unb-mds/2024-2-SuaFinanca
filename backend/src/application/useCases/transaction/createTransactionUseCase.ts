import {
  CreateTransactionParamsWithCategoryName,
  ITransactionRepository,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";

import { CreateTransactionReturn } from "@/main/config/helpers/protocol/transaction/createTransactionProtocols";
import { ICreateTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { IGetCategoryService } from "@/application/interfaces/services/IgetCategoryService";

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly categoryService: IGetCategoryService,
  ) {}

  async execute(
    params: CreateTransactionParamsWithCategoryName,
  ): Promise<CreateTransactionReturn | string> {
    let categoryId: number | undefined;

    if (params.categoryName) {
      const category = await this.categoryService.getCategoryByNameAndUserId(
        params.categoryName,
        params.userId,
      );

      if (!category) {
        return "Category not found";
      }

      categoryId = category.id;
    }

    const newTransaction = await this.transactionRepository.createTransaction({
      ...params,
      categoryId,
    });

    return {
      transaction: {
        type: newTransaction.type,
        amount: newTransaction.amount,
      },
    };
  }
}
