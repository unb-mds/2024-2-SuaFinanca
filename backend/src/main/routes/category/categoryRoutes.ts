import {
  createCategory,
  deleteCategory,
  getCategoriesByUser,
  updateCategory,
} from "./categoryServiceRoutes";

import { authMiddleware } from "@/main/middlewares/authMiddleware";
import express from "express";

const categoryRoutes = express.Router();

categoryRoutes.post("/category", authMiddleware, createCategory);
categoryRoutes.get("/categories", authMiddleware, getCategoriesByUser);
categoryRoutes.delete("/category/:id", authMiddleware, deleteCategory);
categoryRoutes.patch("/category/:id", authMiddleware, updateCategory);

export default categoryRoutes;
