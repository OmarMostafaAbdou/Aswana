import { injectable } from "tsyringe";
import  {IUser} from "../models/user.model";
import {UserModel} from "../models/user.model";
import { ForgotPasswordData, ResetPasswordData, OtpVerificationData } from "types/user";


interface IAuthRepository {
  register(user: Partial<IUser>): Promise<IUser>;
  login(user: Partial<IUser>): Promise<IUser | null>;
  logout(): Promise<void>;
  forgotPassword(data: ForgotPasswordData): Promise<void>;
  resetPassword(data: ResetPasswordData): Promise<void>;
  otpVerification(data: OtpVerificationData): Promise<void>;
}

@injectable()   
class AuthRepository implements IAuthRepository {
  constructor() {}

  async register(user: Partial<IUser>): Promise<IUser> {
    return UserModel.create(user);
  }

  async login(user: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findOne({email: user.email, password: user.password});
  }

  async logout(): Promise<void> {
    return;
  }
  async forgotPassword(data: ForgotPasswordData): Promise<void> {  
    return;
  }
    async resetPassword(data: ResetPasswordData): Promise<void> {
    return;
  }
  async otpVerification(data: OtpVerificationData): Promise<void> {
    return;
  }
}

export { AuthRepository };