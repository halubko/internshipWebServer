import type ApiError from "@/utils/ApiError";
import type { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
   err.status = err.status || 500;
   err.message = err.message || "Internal Server Error";

   console.error(`[${new Date().toISOString()}] - ${err.status} - ${err.message}`);

   return res.status(err.status).json({
      message: err.message,
      errors: err.error,
   });
};

export default errorMiddleware;
