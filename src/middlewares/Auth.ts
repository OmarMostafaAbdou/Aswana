import { Request, Response, NextFunction } from 'express';
import asyncRouterWrapper from 'helpers/asyncWrapper';
import CustomError from 'helpers/Errors';
import { user } from 'types/user';
const UserModel = require("../models/user.model");

interface AuthenticatedRequest extends Request {
  user?: user;
}

const authMiddleware = asyncRouterWrapper(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new CustomError('Authorization token is missing or malformed', 401);
    return res.status(401).json({
      message: err.message,
      status: err.statusCode
    });
  }

  const token = authHeader.split(' ')[1]; 

  const user = await UserModel.getUserFromToken(token);
  if (!user) {
    const err = new CustomError('Invalid or expired token', 401);
    return res.status(401).json({
      message: err.message,
      status: err.statusCode
    });
  }

  req.user = user;
  next(); 
});

export default authMiddleware;
