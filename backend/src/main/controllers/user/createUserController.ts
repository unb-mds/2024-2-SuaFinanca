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

import { CreateUserParams } from "@/application/interfaces/domain/entities/user/IauthUser";
import { CreateUserResponse } from "@/main/config/helpers/protocol/user/authUserProtocols";
import { CreateUserSchema } from "@/application/services/createUserSchema";
import { ICreateUserUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class CreateUserController implements IController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<CreateUserResponse | string>> {
    try {
      const parsedData = CreateUserSchema.safeParse(httpRequest.body);

      if (!parsedData.success) {
        const errorMessage = parsedData.error.errors
          .map((error) => error.message)
          .join(", ");

        return badRequest(errorMessage);
      }

      const newUser = await this.createUserUseCase.execute(httpRequest.body!);

      if (typeof newUser === "string") {
        return badRequest(newUser);
      }

      const responseBody: CreateUserResponse = {
        message: "User created successfully",
        user: {
          name: newUser.user.name,
          email: newUser.user.email,
        },
      };

      return createdRequest<CreateUserResponse>(responseBody);
    } catch {
      return serverError();
    }
  }
}
