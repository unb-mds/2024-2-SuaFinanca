import {
  createTransaction,
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
transactionRoutes.patch(
  "/transaction/update/:id",
  authMiddleware,
  updateTransaction,
);

export default transactionRoutes;
