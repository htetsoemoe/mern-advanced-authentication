import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.get("/signup", signup);

authRouter.get("/login", login);

authRouter.get("/logout", logout);

export default authRouter;