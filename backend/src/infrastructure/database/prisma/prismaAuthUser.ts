import {
  CreateUserParams,
  IAuthUserRepository,
} from "@/application/interfaces/domain/entities/user/IauthUser";
import { IUser, IUserWithId } from "@/domain/entities/User";

import { prisma } from "@/main/config/database/prisma";

export class PrismaAuthUser implements IAuthUserRepository {
  async createUser(params: CreateUserParams): Promise<IUser> {
    const newUser = await prisma.user.create({
      data: {
        name: params.name,
        email: params.email,
        password: params.password,
      },
    });
    return newUser;
  }

  async findUserByEmail(email: string): Promise<IUserWithId | null> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    return user || null;
  }
}
