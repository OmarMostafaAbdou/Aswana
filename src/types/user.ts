export type user ={
    id:string
    first_name:string,
    last_name:String,
    username:string,
    phone:string,
    email:string,
    password: string;
    role: 'user' | 'admin';
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





  import { ToObjectOptions } from "mongoose";

export interface ToJSONLangOptions {
  lang?: "en" | "ar";
}

export type MongooseToJSONOptions = ToObjectOptions & ToJSONLangOptions;