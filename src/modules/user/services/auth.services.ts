import CustomError from "helpers/Errors";
import { IUser } from "../../user/models/user.model";
const UserModel = require("..//models/user.model");
import { UseData } from "../../../types/user";
import { injectable } from "tsyringe";


@injectable()
class AuthServices {
  async register(data: UseData): Promise<IUser> {
    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      username,
      role,
      ar_first_name,
      ar_last_name,
    } = data;

    const existing = await UserModel.findOne({ email });
    if (existing) throw new CustomError("Email already in use", 400);

    const firstName = {
      en: first_name,
      ar: ar_first_name,
    };

    const lastName = {
      en: last_name,
      ar: ar_last_name,
    };

    const createdUser = new UserModel({
      first_name: firstName,
      last_name: lastName,
      password,
      phone,
      email,
      username,
      role,
    });

    const user = await createdUser.save();

    return user;
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new CustomError("Wrong password", 422);
    }

    const token = await user.generateToken();

    return { user, token };
  }
}

export default AuthServices;
