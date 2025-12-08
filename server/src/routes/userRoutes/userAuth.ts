import { Router } from "express";
export const userRouter = Router();
import asyncWrapper from "../../utils/asyncWrapper.js";
import { auth } from "../../middlewares/auth.js";
import { productRouter } from "./productRoutes.js";
import {
  delUser,
  userSignin,
  userSignup,
} from "../../controllers/userAcess/userController.js";
import { Validate } from "../../middlewares/validator.js";
import { signinSchema, signupSchema } from "../../validation/authSchema.js";

userRouter.post("/signup", Validate(signupSchema), asyncWrapper(userSignup));
userRouter.post("/signin", Validate(signinSchema), asyncWrapper(userSignin));
userRouter.delete("/", auth, asyncWrapper(delUser));

userRouter.use("/product", productRouter);
