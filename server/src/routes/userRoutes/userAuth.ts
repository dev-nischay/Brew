import { Router } from "express";
const userRouter = Router();
import asyncWrapper from "../../utils/asyncWrapper.js";
import { auth } from "../../middlewares/auth.js";
import { productRouter } from "./productRoutes.js";

// userRouter.post("/signin",asyncWrapper()) create a user
// userRouter.post("/signin",asyncWrapper()) login a user
// userRouter.delete("/signin",auth,asyncWrapper()) delete a user

userRouter.use("/product", productRouter);
