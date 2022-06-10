import { Router } from "express";
import { deleteUrlsById, getUrlsById, openShortUrl, shortenUrls } from "../controllers/urlsControllers.js";
import schemasValidations from "../middlewares/schemasValidations.js";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", tokenMiddleware,schemasValidations(urlSchema), shortenUrls);
urlsRouter.get("/urls/:id", getUrlsById);
urlsRouter.get("/urls/open/:shortUrl", openShortUrl);
urlsRouter.delete("/urls/:id", tokenMiddleware, deleteUrlsById);

export default urlsRouter;