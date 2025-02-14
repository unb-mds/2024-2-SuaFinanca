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

import { IUpdateCategoryUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { UpdateCategoryParams } from "@/application/interfaces/domain/entities/category/IcategoryRepository";
import { UpdateCategoryResponse } from "@/main/config/helpers/protocol/category/updateCategoryProtocols";
import { UpdateCategorySchema } from "@/application/schema/category/updateCategorySchema";

export class UpdateCategoryController implements IController {
  constructor(private readonly updateCategoryUseCase: IUpdateCategoryUseCase) {}
  async handle(
    httpRequest: HttpRequest<UpdateCategoryParams>,
  ): Promise<HttpResponse<UpdateCategoryResponse | string>> {
    try {
      const parsedData = UpdateCategorySchema.safeParse({
        id: Number(httpRequest.params.id),
        ...httpRequest.body,
      });

      if (!parsedData.success) {
        const errorMessage = parsedData.error.errors
          .map((error) => error.message)
          .join(", ");

        return badRequest(errorMessage);
      }

      const updatedCategory = await this.updateCategoryUseCase.execute(
        parsedData.data,
      );

      if (typeof updatedCategory === "string") {
        return badRequest(updatedCategory);
      }

      const responseBody: UpdateCategoryResponse = {
        message: "Category updated successfully",
        category: {
          name: updatedCategory.category.name,
        },
      };

      return niceRequest<UpdateCategoryResponse>(responseBody);
    } catch {
      return serverError();
    }
  }
}
