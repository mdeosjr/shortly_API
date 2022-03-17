import { Router } from "express";
import { postURL, getURL, deleteURL } from "../controllers/urlsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const urlsRouter = Router();
urlsRouter.post('/urls/shorten', validateTokenMiddleware, postURL);
urlsRouter.get('/urls/:shortUrl', getURL);
urlsRouter.delete('/urls/:id', validateTokenMiddleware, deleteURL);

export default urlsRouter;