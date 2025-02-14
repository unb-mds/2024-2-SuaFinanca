import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocol/protocols";
import { niceRequest, serverError } from "@/main/config/helpers/helpers";

import { GetCategoryService } from "@/application/services/getCategoryService";
import { GetUserBalanceParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { GetUserBalanceSummaryResponse } from "@/main/config/helpers/protocol/transaction/getUserBalanceProtocols";
import { IGetUserBalanceUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { ITransactionSummary } from "@/domain/entities/Transaction";

export class GetUserBalanceSummaryController implements IController {
  constructor(
    private readonly getUserBalanceUseCase: IGetUserBalanceUseCase,
    private readonly categoryService: GetCategoryService,
  ) {}

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

      const incomeTransactions: ITransactionSummary[] = await Promise.all(
        balanceResult.balance.incomeTransactions.map(async (transaction) => {
          let categoryName: string | null = null;
          if (transaction.categoryId) {
            const category =
              await this.categoryService.getCategoryByIdAndUserId(
                transaction.categoryId,
                userId,
              );
            categoryName = category ? category.name : null;
          }
          return {
            type: transaction.type,
            amount: transaction.amount,
            description: transaction.description ?? null,
            categoryName,
            date: transaction.date,
          };
        }),
      );

      const expenseTransactions: ITransactionSummary[] = await Promise.all(
        balanceResult.balance.expenseTransactions.map(async (transaction) => {
          let categoryName: string | null = null;
          if (transaction.categoryId) {
            const category =
              await this.categoryService.getCategoryByIdAndUserId(
                transaction.categoryId,
                userId,
              );
            categoryName = category ? category.name : null;
          }
          return {
            type: transaction.type,
            amount: transaction.amount,
            description: transaction.description ?? null,
            categoryName,
            date: transaction.date,
          };
        }),
      );

      const responseBody: GetUserBalanceSummaryResponse = {
        message: "User transactions successfully retrieved",
        summary: {
          incomeTransactions,
          expenseTransactions,
        },
      };

      return niceRequest<GetUserBalanceSummaryResponse>(responseBody);
    } catch {
      return serverError();
    }
  }
}
