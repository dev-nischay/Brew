import type { Request, Response, NextFunction } from "express";
import AppError from "./AppError.js";

const asyncWrapper = async (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      return next(new AppError("Something went wrong", 500));
    }
  };
};

export default asyncWrapper;
