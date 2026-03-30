import express from "express";
import { refreshToken } from "../controllers/refreshToken.controller.js";

const refreshTokenRouter = express.Router();

refreshTokenRouter.post("/", refreshToken);

export default refreshTokenRouter;
