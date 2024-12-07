import {
  CreateUserParams,
  IAuthUserRepository,
} from "../interfaces/domain/entities/user/IauthUser";

import { CreateUserReturn } from "@/main/config/helpers/protocol/user/authUserProtocols";
import { ICreateUserUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { IuserFactory } from "../interfaces/domain/factories/IuserFactory";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userFactory: IuserFactory,
    private readonly authUserRepositor: IAuthUserRepository,
  ) {}
  async execute(params: CreateUserParams): Promise<CreateUserReturn | string> {
    const existingUser = await this.authUserRepositor.findUserByEmail(
      params.email,
    );

    if (existingUser) {
      return "User with this email already exists";
    }

    const newUser = await this.userFactory.createUser(params);

    const User = await this.authUserRepositor.createUser({
      name: newUser.name,
      email: newUser.email,
      password: newUser.getPassword(),
    });

    return {
      user: {
        name: User.name,
        email: User.email,
      },
    };
  }
}
