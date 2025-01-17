import {
  CreateUserParams,
  IAuthUserRepository,
} from "../interfaces/domain/entities/user/IauthUser";

import { CreateUserReturn } from "@/main/config/helpers/protocol/user/authUserProtocols";
import { ICreateUserUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { IDefaultCategoryService } from "../interfaces/services/IdefaultCategoryService";
import { IuserFactory } from "../interfaces/domain/factories/IuserFactory";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userFactory: IuserFactory,
    private readonly authUserRepository: IAuthUserRepository,
    private readonly defaultCategoryService: IDefaultCategoryService,
  ) {}

  async execute(params: CreateUserParams): Promise<CreateUserReturn | string> {
    const existingUser = await this.authUserRepository.findUserByEmail(
      params.email,
    );

    if (existingUser) {
      return "User with this email already exists";
    }

    const newUser = await this.userFactory.createUser(params);

    const User = await this.authUserRepository.createUser({
      name: newUser.name,
      email: newUser.email,
      password: newUser.getPassword(),
    });

    await this.defaultCategoryService.createDefaultCategories(User.id);

    return {
      user: {
        name: User.name,
        email: User.email,
      },
    };
  }
}
