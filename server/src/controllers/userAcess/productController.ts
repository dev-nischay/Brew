import type { Request, Response, NextFunction } from "express";
import { Product } from "../../modals/product.js";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../types/enums.js";
import type {
  purchaseBody,
  reviewBody,
} from "../../validation/productSchema.js";
import { Purchase } from "../../modals/purchases.js";
import { Feedback } from "../../modals/review.js";
import { Types } from "mongoose";

export const availableProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await Product.find()
    .populate({
      path: "seller",
      select: "-_id -__v -password",
    })
    .select("-__v -images._id");

  console.log(products);

  if (products.length === 0)
    next(
      new AppError(
        "Sorry ! no produts listed at this moment please try again later",
        HttpStatus.NotFound
      )
    );

  res.json({
    status: true,
    message: "Available Products",
    products,
  });
};

export const purchaseProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.token.id;
  const { items, totalAmount } = req.validatedBody as purchaseBody;

  const productIds = items.map((e) => e.productId);

  const products = await Product.find({ _id: { $in: productIds } });

  if (!products)
    return next(
      new AppError("Prodcuts not found try again later", HttpStatus.NotFound)
    );

  await Purchase.create({
    userId,
    totalAmount,
    items,
  });

  res.json({
    status: true,
    message: "Payment Successfull",
  });
};

export const reviewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { review } = req.validatedBody as reviewBody;
  const userId = req.token.id;
  const productString = req.validatedParams?.productId;
  const productId = new Types.ObjectId(productString);

  await Feedback.create({
    product: productId,
    reviewInput: review,
    user: userId,
  });

  res.json({
    status: true,
    message: "Review Sent",
  });
};

export const purchaseHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.token.id;

  const purchases = await Purchase.find({ userId })
    .select("-items._id")
    .populate({
      path: "items.productId",
      select: " -__v",
      populate: { path: "seller", select: "username -_id" },
    })
    .select("-__v totalAmount items -_id -purchasedAt -images._id");

  if (!purchases)
    return next(new AppError("no purchases to display", HttpStatus.BadRequest));

  res.json({
    status: true,
    message: "Payment History",
    purchases,
  });
};
