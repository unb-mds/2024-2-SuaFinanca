import { CreateUserParams } from "../user/IauthUser";
import { User } from "@/domain/entities/user";

export interface IuserFactory {
  createUser(params: CreateUserParams): Promise<User>;
  verifyPassword(userPassword: string, password: string): Promise<boolean>;
}
