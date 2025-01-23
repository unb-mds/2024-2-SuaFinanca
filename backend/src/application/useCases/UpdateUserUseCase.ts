import {
  UpdateUserParams,
  IAuthUserRepository,
} from "@/application/interfaces/domain/entities/user/IauthUser";
import { IUpdateUserUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { UpdateUserReturn } from "@/main/config/helpers/protocol/user/updateUserProtocols";
import { log } from "@/main/config/logs/log";

const logger = log("UpdateUserUseCase");

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly authUserRepository: IAuthUserRepository) {}

  async execute(params: UpdateUserParams): Promise<UpdateUserReturn | string> {
    const user = await this.authUserRepository.findUserById(params.id);

    if (!user) {
      logger.warn(`User not found: ${params.id}`);
      return "User not found";
    }

    const updatedUser = await this.authUserRepository.updateUser(params);

    logger.info(`User updated: ${updatedUser.email}`);
    return {
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    };
  }
}
