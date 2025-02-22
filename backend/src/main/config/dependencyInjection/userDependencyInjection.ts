import { BcryptPassword } from "@/application/utils/hashUtils";
import { CreateUserController } from "@/main/controllers/user/createUserController";
import { CreateUserUseCase } from "@/application/useCases/user/createUseCases";
import { DefaultCategoryService } from "@/application/services/defaultCategoryService";
import { DeleteUserController } from "@/main/controllers/user/deleteUserController";
import { DeleteUserUseCase } from "@/application/useCases/user/deleteUserUseCase";
import { JWTTokenGenerator } from "@/application/utils/authUtils";
import { LoginUserController } from "@/main/controllers/user/loginUserController";
import { LoginUserUseCase } from "@/application/useCases/user/loginUserUseCase";
import { PrismaAuthUser } from "@/infrastructure/database/prisma/prismaAuthUser";
import { PrismaCategoryRepository } from "@/infrastructure/database/prisma/prismaCategoryRepository";
import { UpdateUserController } from "@/main/controllers/user/updateUserController";
import { UpdateUserUseCase } from "@/application/useCases/user/updateUserUseCase";
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

// Update
const updateUserUseCase = new UpdateUserUseCase(prismaAuthUser, bcryptPassword);
const updateUserController = new UpdateUserController(updateUserUseCase);

// Delete
const deleteUserUseCase = new DeleteUserUseCase(prismaAuthUser);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export {
  createUserController,
  loginUserController,
  deleteUserController,
  updateUserController,
};
