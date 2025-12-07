import { Router } from "express";
const adminRouter = Router();
import { listItemsRouter } from "./listRoutes.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../utils/isAdmin.js";
// adminRouter.post("/signup",asyncWrapper()) admin creation
// adminRouter.post("/signin",asyncWrapper()) admin login

adminRouter.use("/list", auth, isAdmin, listItemsRouter);
