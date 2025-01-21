import { CreateCategoryController } from "@/main/controllers/category/createCategoryController";
import { CreateCategoryUseCase } from "@/application/useCases/category/createCategoryUseCase";
import { GetCategoriesByUserController } from "@/main/controllers/category/getCategoriesByUserController";
import { GetCategoriesByUserUseCase } from "@/application/useCases/category/getCategoriesUseCase";
import { PrismaCategoryRepository } from "@/infrastructure/database/prisma/prismaCategoryRepository";
import { UpdateCategoryController } from "@/main/controllers/category/updateCategoryController";
import { UpdateCategoryUseCase } from "@/application/useCases/category/updateCategoryUseCase";

const prismaCategoryRepository = new PrismaCategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(
  prismaCategoryRepository,
);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

const getCategoriesByUserUseCase = new GetCategoriesByUserUseCase(
  prismaCategoryRepository,
);
const getCategoriesByUserController = new GetCategoriesByUserController(
  getCategoriesByUserUseCase,
);

const updateCategoryUseCase = new UpdateCategoryUseCase(
  prismaCategoryRepository,
);
const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase,
);

export {
  createCategoryController,
  getCategoriesByUserController,
  updateCategoryController,
};
