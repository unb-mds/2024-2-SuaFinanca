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

import { GetCategoryByUserIdResponse } from "@/main/config/helpers/protocol/category/getCategoryProtocols";
import { IGetCategoriesByUserUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class GetCategoriesByUserController implements IController {
  constructor(
    private readonly getCategoriesByUserUseCase: IGetCategoriesByUserUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<number>,
  ): Promise<HttpResponse<GetCategoryByUserIdResponse | string>> {
    try {
      if (!httpRequest.userId) {
        return badRequest("User ID is required");
      }

      const result = await this.getCategoriesByUserUseCase.execute(
        httpRequest.userId,
      );

      if (typeof result === "string") {
        return badRequest(result);
      }

      const responseBody: GetCategoryByUserIdResponse = {
        message: "Category found successfully",
        category: result.categories,
      };

      return niceRequest<GetCategoryByUserIdResponse>(responseBody);
    } catch {
      return serverError();
    }
  }
}
