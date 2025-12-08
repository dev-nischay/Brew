import { Router } from "express";
export const adminRouter = Router();
import { listItemsRouter } from "./listRoutes.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import {
  adminSignin,
  adminSignup,
} from "../../controllers/adminAcess/adminController.js";
import { signupSchema, signinSchema } from "../../validation/authSchema.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../utils/isAdmin.js";
import { Validate } from "../../middlewares/validator.js";
adminRouter.post("/signup", Validate(signupSchema), asyncWrapper(adminSignup));
adminRouter.post("/signin", Validate(signinSchema), asyncWrapper(adminSignin));

adminRouter.use("/list", listItemsRouter);
