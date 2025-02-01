import { ITransactionRepository } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { IDeleteTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class DeleteTransactionUseCase implements IDeleteTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(transactionId: number, userId: number): Promise<string | void> {
    const transaction = await this.transactionRepository.findByIdAndUserId(
      transactionId,
      userId,
    );

    if (!transaction) {
      return "Transaction not found";
    }

    await this.transactionRepository.deleteTransaction(transactionId, userId);
  }
}
