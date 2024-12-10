import { IUser, IUserWithId } from "@/domain/entities/User";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface IAuthUserRepository {
  createUser(params: CreateUserParams): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUserWithId | null>;
}
