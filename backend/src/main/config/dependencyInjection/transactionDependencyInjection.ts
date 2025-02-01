import { CreateTransactionController } from "@/main/controllers/transaction/createTransactionController";
import { CreateTransactionUseCase } from "@/application/useCases/transaction/createTransactionUseCase";
import { GetCategoryService } from "@/application/services/getCategoryService";
import { GetUserBalanceController } from "@/main/controllers/transaction/getUserBalanceController";
import { GetUserBalanceUseCase } from "@/application/useCases/transaction/getUserBalanceUseCase";
import { PrismaAuthUser } from "@/infrastructure/database/prisma/prismaAuthUser";
import { PrismaCategoryRepository } from "@/infrastructure/database/prisma/prismaCategoryRepository";
import { PrismaTransactionRepository } from "@/infrastructure/database/prisma/prismaTransactionRepository";
import { UpdateTransactionController } from "@/main/controllers/transaction/updateTransactionController";
import { UpdateTransactionUseCase } from "@/application/useCases/transaction/updateTransactionUseCase";
import { DeleteTransactionUseCase } from "@/application/useCases/transaction/deleteTransactionUseCase";
import { DeleteTransactionController } from "@/main/controllers/transaction/deleteTransactionController";

const prismaTransactionRepository = new PrismaTransactionRepository();
const prismaCategoryRepository = new PrismaCategoryRepository();
const getCategoryService = new GetCategoryService(prismaCategoryRepository);
const prismaAuthUser = new PrismaAuthUser();

// Create
const createTransactionUseCase = new CreateTransactionUseCase(
  prismaTransactionRepository,
  getCategoryService,
);
const createTransactionController = new CreateTransactionController(
  createTransactionUseCase,
);

// GetBalance
const getUserBalanceUseCase = new GetUserBalanceUseCase(
  prismaTransactionRepository,
  prismaAuthUser,
);
const getUserBalanceController = new GetUserBalanceController(
  getUserBalanceUseCase,
);

// Update
const updateTransactionUseCase = new UpdateTransactionUseCase(
  prismaTransactionRepository,
  getCategoryService,
);
const updateTransactionController = new UpdateTransactionController(
  updateTransactionUseCase,
);

// Delete
const deleteTransactionUseCase = new DeleteTransactionUseCase(
  prismaTransactionRepository,
);
const deleteTransactionController = new DeleteTransactionController(
  deleteTransactionUseCase,
);

export {
  createTransactionController,
  getUserBalanceController,
  updateTransactionController,
  deleteTransactionController,
};
