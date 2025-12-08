import type { Request, Response, NextFunction } from "express";
import type { createBody, loginBody } from "../../validation/authSchema.js";
import { Admin } from "../../modals/admin.js";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../types/enums.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.validatedBody as createBody;
  const alreadyExists = await Admin.findOne({ username });

  if (alreadyExists)
    return next(new AppError("Admin already exists", HttpStatus.Forbidden));

  const hashedPass = await bcrypt.hash(password, 10);

  await Admin.create({
    username,
    password: hashedPass,
  });

  res.json({ status: true, message: "You are signed up" });
};

export const adminSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.validatedBody as loginBody;

  const isAdmin = await Admin.findOne({ username });

  if (!isAdmin)
    return next(
      new AppError(
        "Admin account not found. Please sign up to continue.",
        HttpStatus.NotFound
      )
    );

  const token = jwt.sign(
    {
      id: isAdmin._id,
      role: "Admin",
    },
    process.env.JWT_SECRET!
  );

  res.json({
    status: true,
    message: "You are Signed in",
    token,
  });
};
