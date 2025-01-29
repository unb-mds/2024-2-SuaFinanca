import { GetUserBalanceParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { GetUserBalanceReturn } from "@/main/config/helpers/protocol/transaction/getUserBalanceProtocols";
import { IAuthUserRepository } from "@/application/interfaces/domain/entities/user/IauthUser";
import { IGetUserBalanceUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { ITransactionRepository } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { TransactionType } from "@/domain/entities/Transaction";

export class GetUserBalanceUseCase implements IGetUserBalanceUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly authUserRepositor: IAuthUserRepository,
  ) {}

  async execute(params: GetUserBalanceParams): Promise<GetUserBalanceReturn> {
    const user = await this.authUserRepositor.findUserById(params.userId);

    const incomeTransactions =
      await this.transactionRepository.findByUserIdAndMonthAndYearAndType(
        params.userId,
        params.month,
        params.year,
        TransactionType.INCOME,
      );

    const expenseTransactions =
      await this.transactionRepository.findByUserIdAndMonthAndYearAndType(
        params.userId,
        params.month,
        params.year,
        TransactionType.EXPENSE,
      );

    const totalIncome = incomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );
    const totalExpense = expenseTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

    return {
      balance: {
        balance: user?.balance || 0,
        totalIncome,
        totalExpense,
      },
    };
  }
}
