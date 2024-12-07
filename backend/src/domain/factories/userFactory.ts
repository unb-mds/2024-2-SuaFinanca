import { CreateUserParams } from "@/application/interfaces/domain/entities/user/IauthUser";
import { IuserFactory } from "@/application/interfaces/domain/factories/IuserFactory";
import { PasswordHash } from "@/application/interfaces/utils/passwordHash";
import { User } from "../entities/User";

export class UserFactory implements IuserFactory {
  constructor(private readonly passwordHash: PasswordHash) {}

  async createUser(params: CreateUserParams): Promise<User> {
    const passwordHash = await this.passwordHash.hash(params.password);
    return new User(params.name, params.email, passwordHash);
  }

  async verifyPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await this.passwordHash.compare(password, userPassword);
  }
}
