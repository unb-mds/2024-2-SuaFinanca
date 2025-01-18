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
import { DeleteUserResponse } from "@/main/config/helpers/protocol/user/deleteUserProtocols";
import { IDeleteUserUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { log } from "@/main/config/logs/log";

const logger = log("DeleteUserController");

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: IDeleteUserUseCase) {}

  async handle(
    httpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<DeleteUserResponse | string>> {
    try {
      const userId = httpRequest.body

      const typeId = typeof(userId)
      logger.info(userId);
      logger.info(typeId);

      if (!userId) {
        return badRequest("UserId are required");
      }

      const result = await this.deleteUserUseCase.execute(Number(userId));

      if (typeof result === "string") {
        return badRequest(result);
      }

      const responseBody: DeleteUserResponse = {
        message: "User successfully deleted",
        user: {
          name: result?.user.name,
          email: result?.user.email,
        },
      };

      return niceRequest<DeleteUserResponse>(responseBody);
    } catch (error) {
      logger.warn(error);
      return serverError();
    }
  }
}
