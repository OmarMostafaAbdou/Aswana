import AuthServices from "modules/user/services/auth.services";
import { Request, Response } from 'express';
import asyncRouterWrapper from "helpers/asyncWrapper";
import { injectable, inject } from 'tsyringe'; 
@injectable()

class AuthController{
    
      constructor (@inject(AuthServices)private authService:AuthServices){}
      
      userSignup = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
        const user = await this.authService.register(req.body);    
        const lang = res.locals.lang || "en";

        res.status(201).json({
          user: user.toJSON({ lang } as any),
          message: "User registered successfully",
        });
      });
      userLogin = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
        const user = await this.authService.login(req.body.email,req.body.password);

    
        res.status(201).json({
          ...user,
          message: "User login successfully",
        });
      });
    }
      
    export default AuthController;

