import express from "express";
import cors from "cors";
import userRouter from "./router/user.route.js";
import refreshTokenRouter from "./router/refreshToken.route.js";
import quotesRouter from "./router/quotes.route.js";
import pool from "./config/connection.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', userRouter)
app.use('/refresh', refreshTokenRouter)
app.use('/quotes', quotesRouter)

const PORT = process.env.PORT || 5055;
app.listen(PORT, () => {
  pool
  console.log(`Server is running on port ${PORT}`);
});
