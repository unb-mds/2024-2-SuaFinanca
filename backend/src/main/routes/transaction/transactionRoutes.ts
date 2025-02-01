import {
  createTransaction,
  getUserBalance,
  updateTransaction,
  deleteTransaction,
} from "./transactionServiceRoutes";

import { authMiddleware } from "@/main/middlewares/authMiddleware";
import express from "express";

const transactionRoutes = express.Router();

transactionRoutes.post("/transaction", authMiddleware, createTransaction);
transactionRoutes.get("/transaction/balance", authMiddleware, getUserBalance);
transactionRoutes.patch(
  "/transaction/update/:id",
  authMiddleware,
  updateTransaction,
);
transactionRoutes.delete("/transaction/:id", authMiddleware, deleteTransaction);

export default transactionRoutes;
