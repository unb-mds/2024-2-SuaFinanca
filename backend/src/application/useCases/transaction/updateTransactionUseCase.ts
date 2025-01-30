import {
  ITransactionRepository,
  UpdateTransactionParams,
} from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";

import { IUpdateTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { UpdateTransactionReturn } from "@/main/config/helpers/protocol/transaction/updateTransactionProtocols";

export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(
    params: UpdateTransactionParams,
  ): Promise<UpdateTransactionReturn | string> {
    const date = new Date(params.date);
    const existingTransaction =
      await this.transactionRepository.findByUserIdAndMonthAndYearAndType(
        params.userId,
        date.getMonth(),
        date.getFullYear(),
        params.type,
      );

    if (!existingTransaction) {
      return "Transaction not found";
    }

    const updatedTransaction =
      await this.transactionRepository.updateTransaction(params);

    return {
      transaction: {
        type: updatedTransaction.type,
        amount: updatedTransaction.amount,
        userId: 0,
        date: "",
      },
    };
  }
}
