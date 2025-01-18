import { BcryptPassword } from "@/application/utils/hashUtils";
import { CreateUserController } from "@/main/controllers/user/createUserController";
import { CreateUserUseCase } from "@/application/useCases/createUseCases";
import { DefaultCategoryService } from "@/application/services/defaultCategoryService";
import { JWTTokenGenerator } from "@/application/utils/authUtils";
import { LoginUserController } from "@/main/controllers/user/loginUserController";
import { LoginUserUseCase } from "@/application/useCases/loginUserUseCase";
import { PrismaAuthUser } from "@/infrastructure/database/prisma/prismaAuthUser";
import { PrismaCategoryRepository } from "@/infrastructure/database/prisma/prismaCategoryRepository";
import { UserFactory } from "@/domain/factories/userFactory";

// Auth
const bcryptPassword = new BcryptPassword();
const jWTTokenGenerator = new JWTTokenGenerator();
const userFactory = new UserFactory(bcryptPassword);
const prismaAuthUser = new PrismaAuthUser();
const prismaCategoryRepository = new PrismaCategoryRepository();
const defaultCategoryService = new DefaultCategoryService(
  prismaCategoryRepository,
);

// Create
const createUserUseCase = new CreateUserUseCase(
  userFactory,
  prismaAuthUser,
  defaultCategoryService,
);
const createUserController = new CreateUserController(createUserUseCase);

// Login
const loginUserUseCase = new LoginUserUseCase(
  userFactory,
  jWTTokenGenerator,
  prismaAuthUser,
);
const loginUserController = new LoginUserController(loginUserUseCase);

export { createUserController, loginUserController };
