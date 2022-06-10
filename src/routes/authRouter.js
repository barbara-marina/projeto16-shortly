import { Router } from "express";
import { signIn, signUp } from "../controllers/authControllers.js";
import schemasValidations from "../middlewares/schemasValidations.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemasValidations(signUpSchema), signUp);
authRouter.post("/signin", schemasValidations(signInSchema), signIn);

export default authRouter;