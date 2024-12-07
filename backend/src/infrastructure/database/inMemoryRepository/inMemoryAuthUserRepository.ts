import {
  CreateUserParams,
  IAuthUserRepository,
} from "@/application/interfaces/domain/entities/user/IauthUser";
import { IUser, IUserWithId } from "@/domain/entities/User";

export class InMemoryAuthUserRepository implements IAuthUserRepository {
  private users: any[] = [];

  async createUser(params: CreateUserParams): Promise<IUser> {
    const newUser = { ...params };
    this.users.push(newUser);
    return newUser;
  }

  async findUserByEmail(email: string): Promise<IUserWithId | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
}
