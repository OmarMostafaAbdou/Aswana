  import CustomError from "../../../helpers/Errors";
  import { IUser } from "../../../modules/user/models/user.model";
  import { Types } from "mongoose";
  import { UseData, user } from "../../../types/user";
  import { paginate } from "../../../utils/pagination";
import {  injectable } from "tsyringe";
  const UserModel = require("../models/user.model");

  injectable()

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
    
      const { data: users, meta } = await paginate<IUser & Document>(UserModel, page, limit);
    
      if (!users.length) {
        throw new CustomError("No users found. Create a new one.", 400);
      }
      const localizedUsers = users.map((user: IUser) =>user.toJSON({ lang } as any)      );

    
      return {
        users:localizedUsers,
        totalPages: meta.totalPages,
        meta: {
          totalUsers: meta.totalItems,
          currentPage: meta.currentPage,
          lastPages: meta.totalPages,
        },
      };
    }
    
      async getUserById(id:string,lang:string="en"):Promise<user>{
          const user=await UserModel.findById(id)
          if (!Types.ObjectId.isValid(id)) {
              throw new CustomError("Invalid user ID format", 400);
          }
      
              if (!user) throw new CustomError("this user is not found", 400);
              return user.toJSON({ lang } as any);

          

      }

      async updateUser(id: string, data: UseData, lang: string = "en"): Promise<user> {
        if (!Types.ObjectId.isValid(id)) {
          throw new CustomError("Invalid user ID format", 400);
        }
      
        const {
          email,
          password,
          first_name,
          last_name,
          phone,
          username,
          ar_first_name,
          ar_last_name,
        } = data;
      

        const firstName = {
          en: first_name,
          ar: ar_first_name,
        };
    
        const lastName = {
          en: last_name,
          ar: ar_last_name,
        };
        const updatedUser = await UserModel.findByIdAndUpdate(
          id,
          {
            email,
            password,
            first_name:firstName,
            last_name:lastName,
            phone,
            username,
        
          },
          { new: true, runValidators: true }
        );
      
        if (!updatedUser) {
          throw new CustomError("User not found or update failed", 400);
        }
      
        return updatedUser.toJSON({ lang } as any);
      }
      
      async DeleteUser(id: string, lang: string = "en"): Promise<user> {
        if (!Types.ObjectId.isValid(id)) {
          throw new CustomError("Invalid user ID format", 400);
      }

      const deletedUser = await UserModel.findByIdAndDelete(id);

      if (!deletedUser) {
          throw new CustomError("User not found or delete failed", 400);
      }

      return deletedUser.toJSON({ lang } as any);
    }
  }
  export default UserServices;
