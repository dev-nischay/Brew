import { Router } from "express";
export const listItemsRouter = Router();
import asyncWrapper from "../../utils/asyncWrapper.js";
import { Validate } from "../../middlewares/validator.js";
import {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} from "../../validation/productSchema.js";
import {
  listProduct,
  delistProduct,
  showProducts,
  updateProduct,
} from "../../controllers/adminAcess/listController.js";

listItemsRouter.put(
  "/:productId",
  Validate(productIdSchema, "params"),
  Validate(updateProductSchema),
  asyncWrapper(updateProduct)
);

listItemsRouter.delete(
  "/:productId",
  Validate(productIdSchema, "params"),
  asyncWrapper(delistProduct)
);

listItemsRouter.post(
  "/",
  Validate(createProductSchema),
  asyncWrapper(listProduct)
);
listItemsRouter.get("/", asyncWrapper(showProducts));
