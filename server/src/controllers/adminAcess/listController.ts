import type { Request, Response, NextFunction } from "express";
import type {
  productBody,
  productUpdateBody,
} from "../../validation/productSchema.js";
import { Product } from "../../modals/product.js";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../types/enums.js";

export const listProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const credentials = req.validatedBody as productBody;

  const adminId = req.token.id;

  await Product.create({
    ...credentials,
    seller: adminId,
  });

  res.json({
    status: true,
    message: "Product listed",
  });
};

export const delistProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.validatedParams?.productId;
  const seller = req.token.id;
  const product = await Product.findOneAndDelete({
    _id: productId,
    seller,
  });

  console.log(product);
  if (!product)
    return next(new AppError("Product not found ", HttpStatus.NotFound));

  res.json({
    status: true,
    message: "Product removed sucessfully",
  });
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updatedCreds = req.validatedBody as productUpdateBody;
  const productId = req.validatedParams?.productId;
  const seller = req.token.id;
  const product = await Product.findOneAndUpdate(
    { _id: productId, seller },
    updatedCreds,
    { new: true }
  );

  if (!product)
    return next(new AppError("Product not found ", HttpStatus.NotFound));

  res.json({
    status: true,
    message: "Creds updated Successfully",
  });
};

export const showProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await Product.find()
    .populate({
      path: "seller",
      select: "-_id -__v -password",
    })
    .select("-__v");

  if (products.length === 0)
    next(
      new AppError(
        "Sorry ! no produts listed at this moment please come back later",
        HttpStatus.NotFound
      )
    );

  res.json({
    status: true,
    message: "Available Products",
    products,
  });
};
