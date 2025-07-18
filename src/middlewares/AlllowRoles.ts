import { Request, Response, NextFunction } from 'express';
import { Roles, user } from 'types/user';
import asyncRouterWrapper from 'helpers/asyncWrapper';

interface AuthenticatedRequest extends Request {
  user?: user;
}

export class AllowRoles {
  static check(...allowedRoles: Roles[]) {
    return asyncRouterWrapper(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(401).json({ message: 'Unauthorized: No role provided' });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }

      next();
    });
  }
}
