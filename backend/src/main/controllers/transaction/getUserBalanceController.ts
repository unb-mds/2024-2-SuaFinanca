import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocol/protocols";
import { niceRequest, serverError } from "@/main/config/helpers/helpers";

import { GetUserBalanceParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { GetUserBalanceResponse } from "@/main/config/helpers/protocol/transaction/getUserBalanceProtocols";
import { IGetUserBalanceUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class GetUserBalanceController implements IController {
  constructor(private readonly getUserBalanceUseCase: IGetUserBalanceUseCase) {}

  async handle(
    httpRequest: HttpRequest<GetUserBalanceParams>,
  ): Promise<HttpResponse<GetUserBalanceResponse | string>> {
    try {
      const userId = httpRequest.userId;
      const month = parseInt(httpRequest.query.month) - 1;
      const year = parseInt(httpRequest.query.year);

      const balanceResult = await this.getUserBalanceUseCase.execute({
        userId,
        month,
        year,
      });

      const responseBody: GetUserBalanceResponse = {
        message: "User balance retrieved successfully",
        balance: {
          balance: balanceResult.balance.balance,
          totalIncome: balanceResult.balance.totalIncome,
          totalExpense: balanceResult.balance.totalExpense,
        },
      };

      return niceRequest(responseBody);
    } catch {
      return serverError();
    }
  }
}
