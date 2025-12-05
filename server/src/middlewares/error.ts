import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
export const error = async (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const statusCode = 500 | err.statusCode;

    return res.status(statusCode).json({
      status: false,
      message: err.message || "Someting Went Wrong",
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      status: false,
      priority: "High",
      message: err.message,
    });
  }
};
