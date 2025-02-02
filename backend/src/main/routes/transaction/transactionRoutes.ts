import {
  createTransaction,
  getRecentTransactions,
  getUserBalance,
  updateTransaction,
} from "./transactionServiceRoutes";

import { authMiddleware } from "@/main/middlewares/authMiddleware";
import express from "express";

const transactionRoutes = express.Router();

transactionRoutes.post("/transaction", authMiddleware, createTransaction);
transactionRoutes.get("/transaction/balance", authMiddleware, getUserBalance);
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

export default transactionRoutes;
