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

import { CreateCategoryParams } from "@/application/interfaces/domain/entities/category/IcategoryRepository";
import { CreateCategoryResponse } from "@/main/config/helpers/protocol/category/createCategoryProtocols";
import { CreateCategorySchema } from "@/application/schema/category/createCategorySchema";
import { ICreateCategoryUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class CreateCategoryController implements IController {
  constructor(private readonly createCategoryUseCase: ICreateCategoryUseCase) {}
  async handle(
    httpRequest: HttpRequest<CreateCategoryParams>,
  ): Promise<HttpResponse<CreateCategoryResponse | string>> {
    try {
      const parsedData = CreateCategorySchema.safeParse(httpRequest.body);

      if (!parsedData.success) {
        const errorMessage = parsedData.error.errors
          .map((error) => error.message)
          .join(", ");

        return badRequest(errorMessage);
      }

      const newCategory = await this.createCategoryUseCase.execute(
        httpRequest.body!,
      );

      if (typeof newCategory === "string") {
        return badRequest(newCategory);
      }

      const responseBody: CreateCategoryResponse = {
        message: "Category created successfully",
        category: {
          name: newCategory.category.name,
        },
      };

      return createdRequest<CreateCategoryResponse>(responseBody);
    } catch {
      return serverError();
    }
  }
}
