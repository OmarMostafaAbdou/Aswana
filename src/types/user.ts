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
    first_name:string,
    last_name:String,
    username:string,
    phone:string,
    email:string,
    password: string,
    role:string
}