import {
  HttpRequest,
  HttpResponse,
  IController,
} from "@/main/config/helpers/protocol/protocols";
import {
  badRequest,
  createdRequest,
  serverError,
} from "@/main/config/helpers/helpers";
import { formatISO, parseISO } from "date-fns";

import { CreateTransactionParams } from "@/application/interfaces/domain/entities/transaction/ItransactionRepository";
import { CreateTransactionResponse } from "@/main/config/helpers/protocol/transaction/createTransactionProtocols";
import { CreateTransactionSchema } from "@/application/schema/transaction/createTransactionSchema";
import { ICreateTransactionUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { log } from "@/main/config/logs/log";

const logger = log("createTransactionController");

export class CreateTransactionController implements IController {
  constructor(
    private readonly createTransactionUseCase: ICreateTransactionUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateTransactionParams>,
  ): Promise<HttpResponse<CreateTransactionResponse | string>> {
    try {
      const parsedData = CreateTransactionSchema.safeParse(httpRequest.body);

      if (!parsedData.success) {
        const errorMessage = parsedData.error.errors
          .map((error) => error.message)
          .join(", ");

        return badRequest(errorMessage);
      }

      const { date, ...rest } = httpRequest.body!;

      logger.debug(`date: ${date}`);
      logger.debug(`parseISO: ${parseISO(date)}`);
      logger.debug(`formatISO: ${formatISO(parseISO(date))}`);

      const formattedDate = formatISO(parseISO(date));

      const newTransaction = await this.createTransactionUseCase.execute({
        ...rest,
        date: formattedDate,
      });

      if (typeof newTransaction === "string") {
        return badRequest(newTransaction);
      }

      const responseBody: CreateTransactionResponse = {
        message: "Transaction created successfully",
        transaction: {
          type: newTransaction.transaction.type,
          amount: newTransaction.transaction.amount,
        },
      };

      return createdRequest<CreateTransactionResponse>(responseBody);
    } catch (error) {
      logger.error(`Error: ${error}`);
      return serverError();
    }
  }
}
