import {
  IAuthUserRepository,
  LoginUserParams,
} from "../interfaces/domain/entities/user/IauthUser";

import { ILoginUserUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { IuserFactory } from "../interfaces/domain/factories/IuserFactory";
import { LoginUserReturn } from "@/main/config/helpers/protocol/user/authUserProtocols";
import { TokenGenerator } from "../interfaces/utils/tokenGenerator";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly userFactory: IuserFactory,
    private readonly tokenGenerator: TokenGenerator,
    private readonly authUserRepositor: IAuthUserRepository,
  ) {}
  async execute(params: LoginUserParams): Promise<LoginUserReturn | string> {
    const user = await this.authUserRepositor.findUserByEmail(params.email);

    if (!user) {
      return "User not found";
    }

    const isPasswordValid = await this.userFactory.verifyPassword(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      return "Invalid password";
    }

    const token = this.tokenGenerator.generateToken(user);

    return {
      token: token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
