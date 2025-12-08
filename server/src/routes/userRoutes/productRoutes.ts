import { Router } from "express";
export const productRouter = Router();
import asyncWrapper from "../../utils/asyncWrapper.js";
import { auth } from "../../middlewares/auth.js";
import {
  availableProducts,
  purchaseHistory,
  purchaseProduct,
  reviewProduct,
} from "../../controllers/userAcess/productController.js";
import {
  productIdSchema,
  purchaseProductSchema,
  reviewProductSchema,
} from "../../validation/productSchema.js";
import { Validate } from "../../middlewares/validator.js";
productRouter.get("/", asyncWrapper(availableProducts)); // can be hit by anyone

productRouter.use(auth);

productRouter.post(
  "/purchase",
  Validate(purchaseProductSchema),
  asyncWrapper(purchaseProduct)
);

productRouter.post(
  "/:productId/review",
  Validate(productIdSchema, "params"),
  Validate(reviewProductSchema),
  asyncWrapper(reviewProduct)
);

productRouter.get("/history", asyncWrapper(purchaseHistory));
