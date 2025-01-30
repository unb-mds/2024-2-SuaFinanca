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

import { IUpdateTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { UpdateTransactionParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { UpdateTransactionResponse } from "@/main/config/helpers/protocol/transaction/updateTransactionProtocols";
import { UpdateTransactionSchema } from "@/application/services/updateTransactionSchema";
import { log } from "@/main/config/logs/log";

const logger = log("UpdateTransactionController");

export class UpdateTransactionController implements IController {
  constructor(
    private readonly updateTransactionUseCase: IUpdateTransactionUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateTransactionParams>,
  ): Promise<HttpResponse<UpdateTransactionResponse | string>> {
    try {
      const parsedData = UpdateTransactionSchema.safeParse(httpRequest.body);

      if (!parsedData.success) {
        const errorMessage = parsedData.error.errors
          .map((error) => error.message)
          .join(", ");
        return badRequest(errorMessage);
      }

      const updatedTransaction = await this.updateTransactionUseCase.execute(
        httpRequest.body!,
      );

      if (typeof updatedTransaction === "string") {
        return badRequest(updatedTransaction);
      }

      const responseBody: UpdateTransactionResponse = {
        message: "Transaction updated successfully",
        transaction: {
          type: updatedTransaction.transaction.type,
          amount: updatedTransaction.transaction.amount,
        },
      };

      return niceRequest<UpdateTransactionResponse>(responseBody);
    } catch (error) {
      logger.error(`Error: ${error}`);
      return serverError();
    }
  }
}
