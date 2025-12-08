import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
export const error = async (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const statusCode = err.statusCode || 500;
    console.log(err);
    return res.status(statusCode).json({
      status: false,
      message: err.message || "Someting Went Wrong",
    });
  }

  if (err instanceof Error) {
    console.log(err);
    return res.status(500).json({
      status: false,
      priority: "High",
      message: err.message,
    });
  }
};
