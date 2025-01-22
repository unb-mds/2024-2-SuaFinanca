import {
  CreateUserParams,
  IAuthUserRepository,
} from "@/application/interfaces/domain/entities/user/IauthUser";

import { IUserWithId } from "@/domain/entities/User";

export class InMemoryAuthUserRepository implements IAuthUserRepository {
  private users: any[] = [];

  async createUser(params: CreateUserParams): Promise<IUserWithId> {
    const newUser: IUserWithId = { id: this.users.length + 1, ...params };
    this.users.push(newUser);
    return newUser;
  }

  async findUserById(id: number): Promise<IUserWithId | null> {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  async findUserByEmail(email: string): Promise<IUserWithId | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  async deleteUser(id: number): Promise<undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return undefined;
  }
}
