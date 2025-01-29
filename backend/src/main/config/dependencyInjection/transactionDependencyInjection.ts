import { CreateTransactionController } from "@/main/controllers/transaction/createTransactionController";
import { CreateTransactionUseCase } from "@/application/useCases/transaction/createTransactionUseCase";
import { GetCategoryService } from "@/application/services/getCategoryService";
import { GetRecentTransactionsController } from "@/main/controllers/transaction/getRecentTransactionsController";
import { GetRecentTransactionsUseCase } from "@/application/useCases/transaction/getRecentTransactionsUseCase";
import { GetUserBalanceController } from "@/main/controllers/transaction/getUserBalanceController";
import { GetUserBalanceUseCase } from "@/application/useCases/transaction/getUserBalanceUseCase";
import { PrismaAuthUser } from "@/infrastructure/database/prisma/prismaAuthUser";
import { PrismaCategoryRepository } from "@/infrastructure/database/prisma/prismaCategoryRepository";
import { PrismaTransactionRepository } from "@/infrastructure/database/prisma/prismaTransactionRepository";

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

const getRecentTransactionsUseCase = new GetRecentTransactionsUseCase(
  prismaTransactionRepository,
);
const getRecentTransactionsController = new GetRecentTransactionsController(
  getRecentTransactionsUseCase,
);

export {
  createTransactionController,
  getUserBalanceController,
  getRecentTransactionsController,
};
