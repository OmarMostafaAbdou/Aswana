export type user ={
    id:string
    first_name:string,
    last_name:String,
    username:string,
    phone:string,
    email:string,
    password: string;
    role: "seller" | "buyer" | "admin";
    token?:string
}
export interface UseData {
    id:string
    first_name: string; 
    last_name: string;
    ar_first_name: string;
    ar_last_name: string; 
    username:string,
    phone:string,
    email:string,
    password: string,
    role:string
}

export interface ForgotPasswordData{
  email:string
}
export interface ResetPasswordData{
  email:string
  password:string
  confirmPassword:string
} 
export interface OtpVerificationData{
  email:string
  otp:string
}



export interface categoryData{
  ar_category_name:string
  en_category_name:string
  ar_description:string
  en_description:string
  image:string
}
export interface ProductData{
  ar_product_name:string
  en_product_name:string
  ar_description:string
  en_description:string
  image:string
  categoryId: string;
  price: number;  
  isAuction: boolean;
  gallery: string[];
  sellerId: string;
}
export interface auctionData{
  productId: string;
  startDate: Date;
  endDate: Date;
  status?: "active" | "completed" | "cancelled";
}


  import { ToObjectOptions } from "mongoose";

export interface ToJSONLangOptions {
  lang?: "en" | "ar";
}

export type Roles = "seller" | "buyer" | "admin";

export type MongooseToJSONOptions = ToObjectOptions & ToJSONLangOptions;