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
import { formatISO, parseISO } from "date-fns";

import { IUpdateTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { TransactionType } from "@/domain/entities/Transaction";
import { UpdateTransactionResponse } from "@/main/config/helpers/protocol/transaction/updateTransactionProtocols";
import { UpdateTransactionSchema } from "@/application/schema/transaction/updateTransactionSchema";
import { UpdateTransactionWithCategoryNameParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { log } from "@/main/config/logs/log";

const logger = log("UpdateTransactionController");

export class UpdateTransactionController implements IController {
  constructor(
    private readonly updateTransactionUseCase: IUpdateTransactionUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateTransactionWithCategoryNameParams>,
  ): Promise<HttpResponse<UpdateTransactionResponse | string>> {
    try {
      let formattedDate;
      const id = Number(httpRequest.params.id);
      const userId = httpRequest.userId;
      const { amount, date, type, categoryName } = httpRequest.body!;

      logger.info(`Update transaction request: ${JSON.stringify(httpRequest)}`);

      const parsedData = UpdateTransactionSchema.safeParse({
        id,
        amount,
        date,
        type,
        userId,
        categoryName,
      });

      if (!parsedData.success) {
        const errorMessage = parsedData.error.errors
          .map((error) => error.message)
          .join(", ");
        return badRequest(errorMessage);
      }

      if (parsedData.data.date) {
        formattedDate = formatISO(parseISO(date!));
      }

      const updatedTransaction = await this.updateTransactionUseCase.execute({
        ...parsedData.data,
        type: parsedData.data.type as TransactionType,
        date: formattedDate,
      });

      if (typeof updatedTransaction === "string") {
        return badRequest(updatedTransaction);
      }

      const responseBody: UpdateTransactionResponse = {
        message: "Transaction updated successfully",
        transaction: {
          type: updatedTransaction.transaction.type,
          amount: updatedTransaction.transaction.amount,
          categoryName: updatedTransaction.transaction.categoryName,
          date: updatedTransaction.transaction.date,
        },
      };

      return niceRequest<UpdateTransactionResponse>(responseBody);
    } catch (error) {
      logger.error(`Error: ${error}`);
      return serverError();
    }
  }
}
