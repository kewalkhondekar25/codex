import type { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = <T extends (req: Request, res: Response, next: NextFunction) => Promise<any>> (func: T): RequestHandler => {
  
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error)
    }
  }
};

export default asyncHandler;