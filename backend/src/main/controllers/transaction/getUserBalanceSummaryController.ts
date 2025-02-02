import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocol/protocols";
import { niceRequest, serverError } from "@/main/config/helpers/helpers";

import { GetUserBalanceParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { GetUserBalanceSummaryResponse } from "@/main/config/helpers/protocol/transaction/getUserBalanceProtocols";
import { IGetUserBalanceUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { ITransactionSummary } from "@/domain/entities/Transaction";

export class GetUserBalanceSummaryController implements IController {
  constructor(private readonly getUserBalanceUseCase: IGetUserBalanceUseCase) {}

  async handle(
    httpRequest: HttpRequest<GetUserBalanceParams>,
  ): Promise<HttpResponse<GetUserBalanceSummaryResponse | string>> {
    try {
      const userId = httpRequest.userId;
      const month = parseInt(httpRequest.query.month) - 1;
      const year = parseInt(httpRequest.query.year);

      const balanceResult = await this.getUserBalanceUseCase.execute({
        userId,
        month,
        year,
      });

      const incomeTransactions: ITransactionSummary[] =
        balanceResult.balance.incomeTransactions.map((transaction) => ({
          type: transaction.type,
          amount: transaction.amount,
          categoryId: transaction.categoryId ?? null,
          date: transaction.date,
        }));

      const expenseTransactions: ITransactionSummary[] =
        balanceResult.balance.expenseTransactions.map((transaction) => ({
          type: transaction.type,
          amount: transaction.amount,
          categoryId: transaction.categoryId ?? null,
          date: transaction.date,
        }));

      const responseBody: GetUserBalanceSummaryResponse = {
        message: "User transactions successfully retrieved",
        summary: {
          incomeTransactions,
          expenseTransactions,
        },
      };

      return niceRequest(responseBody);
    } catch {
      return serverError();
    }
  }
}
