import type { Request, Response, NextFunction } from "express";
import AppError from "./AppError.js";
import { HttpStatus } from "../types/enums.js";
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = req.token?.role;

    if (!adminId) {
      console.log("Invalid Admin Warning ⚠️");
      return next(
        new AppError(
          "Access Denied: Insufficient Permissions",
          HttpStatus.Forbidden
        )
      );
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
