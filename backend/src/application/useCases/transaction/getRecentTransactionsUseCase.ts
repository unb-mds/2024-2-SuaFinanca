import {
  GetRecentTransactionsParams,
  ITransactionRepository,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";

import { GetCategoryService } from "@/application/services/getCategoryService";
import { GetRecentTransactionsReturn } from "@/main/config/helpers/protocol/transaction/getRecentTransactionsProtocols";
import { IGetRecentTransactionsUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class GetRecentTransactionsUseCase
  implements IGetRecentTransactionsUseCase
{
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly categoryService: GetCategoryService,
  ) {}

  async execute(
    params: GetRecentTransactionsParams,
  ): Promise<GetRecentTransactionsReturn> {
    const transactions =
      await this.transactionRepository.findRecentTransactions(
        params.userId,
        params.limit,
      );

    const transactionsWithCategoryName = await Promise.all(
      transactions.map(async (transaction) => {
        let categoryName: string | null = null;
        if (transaction.categoryId) {
          const category = await this.categoryService.getCategoryByIdAndUserId(
            transaction.categoryId,
            params.userId,
          );
          categoryName = category ? category.name : null;
        }
        return {
          ...transaction,
          categoryName,
        };
      }),
    );

    return {
      recent: {
        transaction: transactionsWithCategoryName,
      },
    };
  }
}
