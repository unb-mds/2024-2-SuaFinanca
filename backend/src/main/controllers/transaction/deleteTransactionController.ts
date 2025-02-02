import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocol/protocols";
import {
  badRequest,
  niceRequest,
  serverError,
} from "@/main/config/helpers/helpers";

import { DeleteTransactionResponse } from "@/main/config/helpers/protocol/transaction/deleteTransactionProtocols";
import { IDeleteTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { log } from "@/main/config/logs/log";

const logger = log("DeleteTransactionController");

export class DeleteTransactionController implements IController {
  constructor(
    private readonly deleteTransactionUseCase: IDeleteTransactionUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<DeleteTransactionResponse | string>> {
    try {
      const transactionId = Number(httpRequest.params.id);
      const userId = httpRequest.userId;

      logger.debug(
        `Delete transaction attempt: ${transactionId} and ${typeof transactionId}`,
      );

      if (!transactionId) {
        return badRequest("Transaction ID is required");
      }

      const result = await this.deleteTransactionUseCase.execute(
        transactionId,
        userId,
      );

      if (typeof result === "string") {
        return badRequest(result);
      }

      const responseBody: DeleteTransactionResponse = {
        message: "Transaction successfully deleted",
        transaction: {
          type: result.transaction.type,
          amount: result.transaction.amount,
          categoryName: result.transaction.categoryName,
          date: result.transaction.date,
        },
      };

      return niceRequest<DeleteTransactionResponse>(responseBody);
    } catch {
      return serverError();
    }
  }
}
