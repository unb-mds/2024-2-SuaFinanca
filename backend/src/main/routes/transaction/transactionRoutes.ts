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

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: INCOME
 *               amount:
 *                 type: number
 *                 example: 1000
 *               categoryName:
 *                 type: string
 *                 example: Salário
 *               date:
 *                 type: string
 *                 example: 2025-01-01
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Bad request
 */
transactionRoutes.post("/transaction", authMiddleware, createTransaction);

/**
 * @swagger
 * /transaction/balance:
 *   get:
 *     summary: Get user balance
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         required: true
 *         example: 01
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         required: true
 *         example: 2025
 *     responses:
 *       200:
 *         description: User balance retrieved successfully
 *       400:
 *         description: Bad request
 */
transactionRoutes.get("/transaction/balance", authMiddleware, getUserBalance);

/**
 * @swagger
 * /transaction/summary:
 *   get:
 *     summary: Get user balance summary
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         required: true
 *         example: 01
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         required: true
 *         example: 2025
 *     responses:
 *       200:
 *         description: User balance summary retrieved successfully
 *       400:
 *         description: Bad request
 */
transactionRoutes.get(
  "/transaction/summary",
  authMiddleware,
  getUserBalanceSummary,
);

/**
 * @swagger
 * /transaction/recent:
 *   get:
 *     summary: Get recent transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         required: true
 *         example: 100
 *     responses:
 *       200:
 *         description: Recent transactions retrieved successfully
 *       400:
 *         description: Bad request
 */
transactionRoutes.get(
  "/transaction/recent",
  authMiddleware,
  getRecentTransactions,
);

/**
 * @swagger
 * /transaction/update/{id}:
 *   patch:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: EXPENSE
 *               amount:
 *                 type: number
 *                 example: 1000
 *               categoryName:
 *                 type: string
 *                 example: Transporte
 *               date:
 *                 type: string
 *                 example: 2025-01-01
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       400:
 *         description: Bad request
 */
transactionRoutes.patch(
  "/transaction/update/:id",
  authMiddleware,
  updateTransaction,
);

/**
 * @swagger
 * /transaction/delete/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       400:
 *         description: Bad request
 */
transactionRoutes.delete(
  "/transaction/delete/:id",
  authMiddleware,
  deleteTransaction,
);

export default transactionRoutes;
