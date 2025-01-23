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
import { UpdateUserParams } from "@/application/interfaces/domain/entities/user/IauthUser";
import { UpdateUserResponse } from "@/main/config/helpers/protocol/user/updateUserProtocols";
import { UpdateUserSchema } from "@/application/services/updateUserSchema";
import { IUpdateUserUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { log } from "@/main/config/logs/log";

const logger = log("UpdateUserController");

export class UpdateUserController implements IController {
  constructor(private readonly updateUserUseCase: IUpdateUserUseCase) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<UpdateUserResponse | string>> {
    try {
      const parsedData = UpdateUserSchema.safeParse(httpRequest.body);

      if (!parsedData.success) {
        const errorMessage = parsedData.error.errors
          .map((error) => error.message)
          .join(", ");
        return badRequest(errorMessage);
      }

      const updatedUser = await this.updateUserUseCase.execute(
        httpRequest.body!,
      );

      if (typeof updatedUser === "string") {
        return badRequest(updatedUser);
      }

      const responseBody: UpdateUserResponse = {
        message: "User updated successfully",
        user: {
          name: updatedUser.user.name,
          email: updatedUser.user.email,
        },
      };

      logger.info(`User updated successfully: ${updatedUser.user.email}`);
      return niceRequest<UpdateUserResponse>(responseBody);
    } catch {
      logger.error(`Error: ${error}`);
      return serverError();
    }
  }
}
