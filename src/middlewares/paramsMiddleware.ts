import type { Request, Response, NextFunction } from "express";

export const paramsMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const { order } = req.query;
   const stringOrderBy = String(order);

   if (stringOrderBy === "asc" || stringOrderBy === "desc") {
      req.query.order = stringOrderBy;
   } else {
      delete req.query.order;
   }

   next();
};
