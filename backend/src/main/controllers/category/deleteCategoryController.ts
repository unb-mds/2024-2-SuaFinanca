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

import { IDeleteCategoryUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { log } from "@/main/config/logs/log";

const logger = log("DeleteCategoryController");

export class DeleteCategoryController implements IController {
  constructor(private readonly deleteCategoryUseCase: IDeleteCategoryUseCase) {}

  async handle(
    httpRequest: HttpRequest<string>,
  ): Promise<HttpResponse<string>> {
    try {
      const categoryId = Number(httpRequest.params.id);
      const userId = httpRequest.userId;

      logger.debug(
        `Delete category attempt: ${categoryId} and ${typeof categoryId}`,
      );

      if (!categoryId) {
        return badRequest("Category ID is required");
      }

      const result = await this.deleteCategoryUseCase.execute(
        categoryId,
        userId,
      );

      if (typeof result === "string") {
        return badRequest(result);
      }

      return niceRequest("Category successfully deleted");
    } catch {
      return serverError();
    }
  }
}
