import { Router } from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import validateSignIn from "../middlewares/signInValidationMiddleware.js";
import validateSignUp from "../middlewares/signUpValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/signin", validateSignIn, signIn);

export default authRouter;