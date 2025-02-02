import {
  createTransaction,
  deleteTransaction,
  getRecentTransactions,
  getUserBalance,
  getUserBalanceSummary,
  updateTransaction,
} from "./transactionServiceRoutes";

import { authMiddleware } from "@/main/middlewares/authMiddleware";
import express from "express";

const transactionRoutes = express.Router();

transactionRoutes.post("/transaction", authMiddleware, createTransaction);
transactionRoutes.get("/transaction/balance", authMiddleware, getUserBalance);
transactionRoutes.get(
  "/transaction/summary",
  authMiddleware,
  getUserBalanceSummary,
);
transactionRoutes.get(
  "/transaction/recent",
  authMiddleware,
  getRecentTransactions,
);
transactionRoutes.patch(
  "/transaction/update/:id",
  authMiddleware,
  updateTransaction,
);
transactionRoutes.delete(
  "/transaction/delete/:id",
  authMiddleware,
  deleteTransaction,
);

export default transactionRoutes;
