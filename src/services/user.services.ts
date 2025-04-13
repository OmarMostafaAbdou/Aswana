  import CustomError from "helpers/Errors";
  import { IUser } from "models/user.model";
  import { Types } from "mongoose";
  import { UseData, user } from "types/user";
  import { paginate } from "utils/pagination";
  const UserModel = require("../models/user.model");


  class UserServices{

    
  async getAllUsers(page?: number, limit?: number, lang: string = "en") {
      if (!page || !limit) {
        const users = await UserModel.find();
        if (!users.length) {
          throw new CustomError("No users found. Create a new one.", 400);
        }
        const localizedUsers = users.map((user: IUser) =>user.toJSON({ lang } as any)      );


        return {
          users:localizedUsers,
          totalPages: 1,
          meta: {
            totalUsers: users.length,
            currentPage: 1,
            lastPages: 1,
          },
        };
      }
    
      const { data: users, meta } = await paginate(UserModel, page, limit);
    
      if (!users.length) {
        throw new CustomError("No users found. Create a new one.", 400);
      }
    
      return {
        users,
        totalPages: meta.totalPages,
        meta: {
          totalUsers: meta.totalItems,
          currentPage: meta.currentPage,
          lastPages: meta.totalPages,
        },
      };
    }
    
      async getUserById(id:string):Promise<user>{
          const user=await UserModel.findById(id)
          if (!Types.ObjectId.isValid(id)) {
              throw new CustomError("Invalid user ID format", 400);
          }
      
              if (!user) throw new CustomError("this user is not found", 400);
          
              return user

      }

      async updateUser(id:string,data:UseData):Promise<user>{
          const { email, password, first_name, last_name, phone, username } = data;
          const updatedUser =await UserModel.findByIdAndUpdate(id,{
              email,
              password,
              first_name,
              last_name,
              phone,
              username,
          },{new:true,runValidators:true})
          if (!Types.ObjectId.isValid(id)) {
              throw new CustomError("Invalid user ID format", 400);
          }
      
          if (!updatedUser) {
              throw new CustomError("User not found or update failed", 400);
          }
      
          return updatedUser;
      }
      
  async  DeleteUser(id: string): Promise<user> {
      if (!Types.ObjectId.isValid(id)) {
          throw new CustomError("Invalid user ID format", 400);
      }

      const deletedUser = await UserModel.findByIdAndDelete(id);

      if (!deletedUser) {
          throw new CustomError("User not found or delete failed", 400);
      }

      return deletedUser;
  }
  }
  export default UserServices;
