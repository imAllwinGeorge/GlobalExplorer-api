import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import logger from "../../infrastructures/logger";
import { AppError } from "../../shared/errors/appError";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  logger.error(err.stack || err.message);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      status: "fail",
      message: err.errors.map((e) => e.message).join(", "),
    });
    return;
  }

  res.status(500).json({
    sucess: false,
    message:
      process.env.NODE_ENV === "prodcution"
        ? "Something went wrong. Please try again later."
        : err.message,
  });
};
