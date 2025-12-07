import { Router } from "express";
export const listItemsRouter = Router();
import asyncWrapper from "../../utils/asyncWrapper.js";

// listItemsRouter.post("/",asyncWrapper()) list a product
// listItemsRouter.get("/",asyncWrapper()) get all listed products
// listItemsRouter.delete("/productId",asyncWrapper()) de-list a product
// listItemsRouter.put("/productId",asyncWrapper()) update product creds
