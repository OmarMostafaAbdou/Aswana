import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncRouterWrapper = (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default asyncRouterWrapper;
