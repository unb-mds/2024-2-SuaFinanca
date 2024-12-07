import { createUser } from "./userServiceRoutes";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/user", createUser);

export default userRoutes;
