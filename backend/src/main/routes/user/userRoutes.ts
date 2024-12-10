import { authUser, createUser, loginUser } from "./userServiceRoutes";

import { authMiddleware } from "@/main/middlewares/authMiddleware";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/user", createUser);
userRoutes.post("/user/login", loginUser);
userRoutes.get("/user/protected", authMiddleware, authUser);

export default userRoutes;
