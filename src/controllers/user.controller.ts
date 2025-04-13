import asyncRouterWrapper from "helpers/asyncWrapper";
import UserServices from "services/user.services";
import { Request, Response } from 'express';

class UserController {
  private userService: UserServices;

  constructor() {
    this.userService = new UserServices();
  }

  GetAllUsers = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const lang = res.locals.lang || "en"; 


    const allUsers = await this.userService.getAllUsers(page, limit,lang);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: allUsers,
    });
  });

  GetOneUser = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const Id=req.params.id
    const user = await this.userService.getUserById(Id)
    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });


  })
  DeleteUser = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const Id=req.params.id
    const user = await this.userService.DeleteUser(Id)
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: user,
      });


  })
  UpdateUser = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const Id=req.params.id
    const body=req.body
    const user = await this.userService.updateUser(Id,body)
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });


  })
}

export default UserController;
