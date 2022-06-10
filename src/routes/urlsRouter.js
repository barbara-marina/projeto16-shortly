import { Router } from "express";
import { shortenUrls } from "../controllers/urlsControllers.js";
import schemasValidations from "../middlewares/schemasValidations.js";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", tokenMiddleware,schemasValidations(urlSchema), shortenUrls);

export default urlsRouter;