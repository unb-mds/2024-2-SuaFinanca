import { IAuthUserRepository } from "@/application/interfaces/domain/entities/user/IauthUser";
import { DeleteUserReturn } from "@/main/config/helpers/protocol/user/deleteUserProtocols";
import { IDeleteUserUseCase } from "@/main/config/helpers/useCases/IuseCases";

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private userRepository: IAuthUserRepository) {}

  async execute(id: number): Promise<DeleteUserReturn | string> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      return "User not found";
    }

    await this.userRepository.deleteUser(id);

    return {
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
