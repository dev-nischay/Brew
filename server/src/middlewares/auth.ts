import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { Payload } from "../types/constants.js";
import AppError from "../utils/AppError.js";
import { HttpStatus } from "../types/enums.js";
const secret = process.env.JWT_SECRET;
const Verify = async (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret!, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new AppError("Auth Header Not Found", 404));
  }

  let token = authHeader?.split(" ")[1];

  if (!token || token.split("").length === 0) {
    return next(new AppError("Token Not Found ", 404));
  }

  try {
    const decode = (await Verify(token as string)) as Payload;
    req.token = decode;
    // access jwt through req.token.id / role
    next();
  } catch (error) {
    console.log(error);
    return next(
      new AppError(
        "Jwt not found kindly login and try again ",
        HttpStatus.BadRequest
      )
    );
  }
};
