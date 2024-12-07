import { BcryptPassword } from "@/application/utils/hashUtils";
import { CreateUserController } from "@/main/controllers/user/createUserController";
import { CreateUserUseCase } from "@/application/useCases/createUseCases";
import { PrismaAuthUser } from "@/infrastructure/database/prisma/prismaAuthUser";
import { UserFactory } from "@/domain/factories/userFactory";

// Auth
const bcryptPassword = new BcryptPassword();
const userFactory = new UserFactory(bcryptPassword);
const prismaAuthUser = new PrismaAuthUser();

// Create
const createUserUseCase = new CreateUserUseCase(userFactory, prismaAuthUser);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
