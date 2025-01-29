import {
  GetRecentTransactionsParams,
  ITransactionRepository,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";

import { GetRecentTransactionsReturn } from "@/main/config/helpers/protocol/transaction/getRecentTransactionsProtocols";
import { IGetRecentTransactionsUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class GetRecentTransactionsUseCase
  implements IGetRecentTransactionsUseCase
{
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(
    params: GetRecentTransactionsParams,
  ): Promise<GetRecentTransactionsReturn> {
    const transactions =
      await this.transactionRepository.findRecentTransactions(
        params.userId,
        params.limit,
      );

    return {
      recent: {
        transaction: transactions,
      },
    };
  }
}
