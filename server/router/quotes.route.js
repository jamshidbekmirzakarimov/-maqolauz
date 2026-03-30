import express from "express";
import { createQuote, getQuotes } from "../controllers/quotes.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const quotesRouter = express.Router();

quotesRouter.get("/", getQuotes);
quotesRouter.post("/", authMiddleware, createQuote);

export default quotesRouter;
