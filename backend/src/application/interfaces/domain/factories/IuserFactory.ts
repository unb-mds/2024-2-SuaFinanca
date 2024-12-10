import { CreateUserParams } from "../entities/user/IauthUser";
import { User } from "@/domain/entities/User";

export interface IuserFactory {
  createUser(params: CreateUserParams): Promise<User>;
  verifyPassword(userPassword: string, password: string): Promise<boolean>;
}
