import { Router } from "express";
import { getRanking, getUserById } from "../controllers/userControllers.js";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users/:id", tokenMiddleware, getUserById );
usersRouter.get("/ranking", getRanking);

export default usersRouter;