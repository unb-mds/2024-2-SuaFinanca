import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocol/protocols";
import { niceRequest, serverError } from "@/main/config/helpers/helpers";

import { GetRecentTransactionsParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { GetRecentTransactionsResponse } from "@/main/config/helpers/protocol/transaction/getRecentTransactionsProtocols";
import { IGetRecentTransactionsUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { ITransactionSummary } from "@/domain/entities/Transaction";

export class GetRecentTransactionsController implements IController {
  constructor(
    private readonly getRecentTransactionsUseCase: IGetRecentTransactionsUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<GetRecentTransactionsParams>,
  ): Promise<HttpResponse<GetRecentTransactionsResponse | string>> {
    try {
      const userId = httpRequest.userId;
      const limit = parseInt(httpRequest.query.limit as string) || 10;

      const recentTransactions =
        await this.getRecentTransactionsUseCase.execute({
          userId,
          limit,
        });

      const transactions: ITransactionSummary[] =
        recentTransactions.recent.transaction.map((transaction) => ({
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description ?? null,
          categoryName: transaction.categoryName ?? null,
          date: transaction.date,
        }));

      const responseBody: GetRecentTransactionsResponse = {
        message: "Recent transactions retrieved successfully",
        recent: {
          transaction: transactions,
        },
      };

      return niceRequest<GetRecentTransactionsResponse>(responseBody);
    } catch {
      return serverError();
    }
  }
}
