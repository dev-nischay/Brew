import { Router } from "express";
export const productRouter = Router();
import asyncWrapper from "../../utils/asyncWrapper.js";
import { auth } from "../../middlewares/auth.js";

// productRouter.get("/",asyncWrapper()) see all available products note- can be accessed by anyone

productRouter.use(auth); // check this

// productRouter.post("/purchase",asyncWrapper()) purchase a product
// productRouter.post("/productId/raing",asyncWrapper()) give a rating to a product
// productRouter.post("/productId/review",asyncWrapper()) give a review (text-based)
