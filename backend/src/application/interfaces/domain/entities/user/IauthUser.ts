import { IUserWithId } from "@/domain/entities/User";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface UpdateUserParams {
  id: number;
  name?: string;
  email?: string;
  password?: string;
}

export interface IAuthUserRepository {
  createUser(params: CreateUserParams): Promise<IUserWithId>;
  findUserByEmail(email: string): Promise<IUserWithId | null>;
  findUserById(id: number): Promise<IUserWithId | null>;
  deleteUser(id: number): Promise<undefined>;
  updateUser(params: UpdateUserParams): Promise<IUserWithId>;
}
