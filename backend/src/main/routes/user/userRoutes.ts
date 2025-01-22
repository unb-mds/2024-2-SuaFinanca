import {
  authUser,
  createUser,
  deleteUser,
  loginUser,
} from "./userServiceRoutes";
import { authMiddleware } from "@/main/middlewares/authMiddleware";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/user", createUser);
userRoutes.post("/user/login", loginUser);
userRoutes.get("/user/protected", authMiddleware, authUser);
userRoutes.delete("/user/delete", authMiddleware, deleteUser);

export default userRoutes;
