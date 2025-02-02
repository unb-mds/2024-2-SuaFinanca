import {
  CreateUserParams,
  IAuthUserRepository,
  UpdateUserParams,
} from "@/application/interfaces/domain/entities/user/IauthUser";

import { IUserWithId } from "@/domain/entities/User";

export class InMemoryAuthUserRepository implements IAuthUserRepository {
  public users: IUserWithId[] = [];

  async createUser(params: CreateUserParams): Promise<IUserWithId> {
    const newUser: IUserWithId = {
      id: this.users.length + 1,
      balance: 0,
      ...params,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findUserById(id: number): Promise<IUserWithId | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findUserByEmail(email: string): Promise<IUserWithId | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async updateUser(params: UpdateUserParams): Promise<IUserWithId> {
    const index = this.users.findIndex((user) => user.id === params.id);
    if (index === -1) {
      throw new Error("User not found");
    }
    const updatedUser = { ...this.users[index], ...params };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  async deleteUser(id: number): Promise<undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return undefined;
  }
}
