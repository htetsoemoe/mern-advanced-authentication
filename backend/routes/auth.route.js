import express from "express";
import {
    signup,
    login,
    logout
} from "../controllers/auth.controller.js";
import {
    signupValidator,
} from "../validators/signup.validator.js";

const authRouter = express.Router();

authRouter.post("/signup", signupValidator, signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;