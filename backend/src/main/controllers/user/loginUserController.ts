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

import { ILoginUserUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { LoginUserParams } from "@/application/interfaces/domain/entities/user/IauthUser";
import { LoginUserResponse } from "@/main/config/helpers/protocol/user/authUserProtocols";

export class LoginUserController implements IController {
  constructor(private readonly loginUserUseCase: ILoginUserUseCase) {}
  async handle(
    httpRequest: HttpRequest<LoginUserParams>,
  ): Promise<HttpResponse<LoginUserResponse | string>> {
    try {
      if (!httpRequest.body) {
        return badRequest("Email and password are required");
      }

      const result = await this.loginUserUseCase.execute(httpRequest.body);

      if (typeof result === "string") {
        return badRequest(result);
      }

      const responseBody: LoginUserResponse = {
        message: "User logged in successfully",
        token: result?.token,
        user: {
          name: result?.user.name,
          email: result?.user.email,
        },
      };
      return niceRequest<LoginUserResponse>(responseBody);
    } catch {
      return serverError();
    }
  }
}
