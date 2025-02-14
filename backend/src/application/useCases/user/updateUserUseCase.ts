import {
  IAuthUserRepository,
  UpdateUserParams,
} from "@/application/interfaces/domain/entities/user/IauthUser";

import { IUpdateUserUseCase } from "@/main/config/helpers/useCases/IuseCases";
import { PasswordHash } from "../../interfaces/utils/passwordHash";
import { UpdateUserReturn } from "@/main/config/helpers/protocol/user/updateUserProtocols";
import { log } from "@/main/config/logs/log";

const logger = log("UpdateUserUseCase");

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly authUserRepository: IAuthUserRepository,
    private readonly passwordHash: PasswordHash,
  ) {}

  async execute(params: UpdateUserParams): Promise<UpdateUserReturn | string> {
    const existingUser = await this.authUserRepository.findUserById(params.id);

    if (!existingUser) {
      return "User not found";
    }

    if (params.email) {
      const emailInUse = await this.authUserRepository.findUserByEmail(
        params.email,
      );
      if (emailInUse && emailInUse.id !== params.id) {
        return "Email already in use";
      }
    }

    if (params.password) {
      const passwordHash = await this.passwordHash.hash(params.password);
      params.password = passwordHash;
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
