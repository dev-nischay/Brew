import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
import { adminRouter } from "./routes/adminRoutes/adminAuth.js";
import { userRouter } from "./routes/userRoutes/userAuth.js";
import { error } from "./middlewares/error.js";
import type { Request, Response, NextFunction } from "express";
import AppError from "./utils/AppError.js";
import { connectDb } from "./utils/connectDb.js";
import { logger } from "./middlewares/logger.js";
import { HttpStatus } from "./types/enums.js";
const Port = process.env.PORT;
app.use(cors());
app.use(logger);
app.use("/api/v1/admin/", adminRouter);
app.use("/api/v1/user/", userRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("Invalid Route", HttpStatus.NotFound));
});

app.use(error);

app.listen(Port, async () => {
  await connectDb();
  console.log(`Server running at Port ${Port}`);
});
