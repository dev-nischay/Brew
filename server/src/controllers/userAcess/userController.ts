import type { Request, Response, NextFunction } from "express";
import type { createBody, loginBody } from "../../validation/authSchema.js";
import { User } from "../../modals/user.js";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../types/enums.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Product } from "../../modals/product.js";

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.validatedBody as createBody;
  const alreadyExists = await User.findOne({ username });

  if (alreadyExists)
    return next(new AppError("User already exists", HttpStatus.Forbidden));

  const hashedPass = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPass,
  });

  res.json({ status: true, message: "You are signed up" });
};

export const userSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.validatedBody as loginBody;

  const isUser = await User.findOne({ username });

  if (!isUser)
    return next(
      new AppError(
        "User account not found. Please sign up to continue.",
        HttpStatus.NotFound
      )
    );

  const token = jwt.sign(
    {
      id: isUser._id,
      role: "User",
    },
    process.env.JWT_SECRET!
  );

  res.json({
    status: true,
    message: "You are Signed in",
    token,
  });
};
// conver above  into a common middle ware to avoid dry code for admin and user auth

export const delUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.token.id;
  const user = await User.findOneAndDelete({ _id: userId });

  if (!user) return next(new AppError("User not found ", HttpStatus.NotFound));

  res.json({
    status: true,
    message: "User deleted :(",
  });
};
