import { CreateCategoryController } from "@/main/controllers/category/createCategoryController";
import { CreateCategoryUseCase } from "@/application/useCases/category/createCategoryUseCase";
import { DeleteCategoryController } from "@/main/controllers/category/deleteCategoryController";
import { DeleteCategoryUseCase } from "@/application/useCases/category/deleteCategoryUseCase";
import { GetCategoriesByUserController } from "@/main/controllers/category/getCategoriesByUserController";
import { GetCategoriesByUserUseCase } from "@/application/useCases/category/getCategoriesUseCase";
import { PrismaCategoryRepository } from "@/infrastructure/database/prisma/prismaCategoryRepository";
import { UpdateCategoryController } from "@/main/controllers/category/updateCategoryController";
import { UpdateCategoryUseCase } from "@/application/useCases/category/updateCategoryUseCase";

const prismaCategoryRepository = new PrismaCategoryRepository();

// Create
const createCategoryUseCase = new CreateCategoryUseCase(
  prismaCategoryRepository,
);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

// Get
const getCategoriesByUserUseCase = new GetCategoriesByUserUseCase(
  prismaCategoryRepository,
);
const getCategoriesByUserController = new GetCategoriesByUserController(
  getCategoriesByUserUseCase,
);

// Update
const updateCategoryUseCase = new UpdateCategoryUseCase(
  prismaCategoryRepository,
);
const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase,
);

// Delete
const deleteCategoryUseCase = new DeleteCategoryUseCase(
  prismaCategoryRepository,
);
const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase,
);

export {
  createCategoryController,
  getCategoriesByUserController,
  updateCategoryController,
  deleteCategoryController,
};
