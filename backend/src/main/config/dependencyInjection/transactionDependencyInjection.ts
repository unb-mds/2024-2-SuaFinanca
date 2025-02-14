import { CreateTransactionController } from "@/main/controllers/transaction/createTransactionController";
import { CreateTransactionUseCase } from "@/application/useCases/transaction/createTransactionUseCase";
import { DeleteTransactionController } from "@/main/controllers/transaction/deleteTransactionController";
import { DeleteTransactionUseCase } from "@/application/useCases/transaction/deleteTransactionUseCase";
import { GetCategoryService } from "@/application/services/getCategoryService";
import { GetRecentTransactionsController } from "@/main/controllers/transaction/getRecentTransactionsController";
import { GetRecentTransactionsUseCase } from "@/application/useCases/transaction/getRecentTransactionsUseCase";
import { GetUserBalanceController } from "@/main/controllers/transaction/getUserBalanceController";
import { GetUserBalanceSummaryController } from "@/main/controllers/transaction/getUserBalanceSummaryController";
import { GetUserBalanceUseCase } from "@/application/useCases/transaction/getUserBalanceUseCase";
import { PrismaAuthUser } from "@/infrastructure/database/prisma/prismaAuthUser";
import { PrismaCategoryRepository } from "@/infrastructure/database/prisma/prismaCategoryRepository";
import { PrismaTransactionRepository } from "@/infrastructure/database/prisma/prismaTransactionRepository";
import { UpdateTransactionController } from "@/main/controllers/transaction/updateTransactionController";
import { UpdateTransactionUseCase } from "@/application/useCases/transaction/updateTransactionUseCase";

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

// GetRecentTransactions
const getRecentTransactionsUseCase = new GetRecentTransactionsUseCase(
  prismaTransactionRepository,
  getCategoryService,
);
const getRecentTransactionsController = new GetRecentTransactionsController(
  getRecentTransactionsUseCase,
);

// GetBalanceSummary
const getUserBalanceSummaryController = new GetUserBalanceSummaryController(
  getUserBalanceUseCase,
  getCategoryService,
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
  getCategoryService,
);
const deleteTransactionController = new DeleteTransactionController(
  deleteTransactionUseCase,
);

export {
  createTransactionController,
  getUserBalanceController,
  getUserBalanceSummaryController,
  getRecentTransactionsController,
  updateTransactionController,
  deleteTransactionController,
};
