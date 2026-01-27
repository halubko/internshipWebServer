import type { NextFunction, Request, Response } from "express";

const asyncWrapper = (
   fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>
) => {
   return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
};

export default asyncWrapper;
