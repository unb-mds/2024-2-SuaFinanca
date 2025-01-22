import { authMiddleware } from "@/main/middlewares/authMiddleware";
import { createTransaction } from "./transactionServiceRoutes";
import express from "express";

const transactionRoutes = express.Router();

transactionRoutes.post("/transaction", authMiddleware, createTransaction);

export default transactionRoutes;
