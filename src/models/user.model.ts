import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import _ from "lodash"
import { JwtPayload } from 'jsonwebtoken';
const jwT=require("jsonwebtoken")
const util=require("util")
const signJWT=util.promisify(jwT.sign)
const verifyJWT=util.promisify(jwT.verify)

interface TokenPayload extends JwtPayload {
    id: string;
  }
  


export interface IUser extends Document{
    generateToken(): void;
    first_name:string,
    last_name:String,
    username:string,
    phone:string,
    email:string,
    password: string;
    role: 'user' | 'admin';
    comparePassword(password:string):Promise<boolean>
}

const {SaltRounds, JWTSecret} = require("../Configs/Configs")
console.log(JWTSecret);



const UserSchema:Schema<IUser>=new Schema({
    username:{type:String,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
   




}, {
    toJSON:{
        transform:(doc,ret)=>{
         return _.omit(ret,["__v","password"])
        }
    
    }
},)

UserSchema.pre<IUser>('save', async function () {
    const currentDocument=this
    if(currentDocument.isModified("password"))
         currentDocument.password= await bcrypt.hash(currentDocument.password,SaltRounds)

})

UserSchema.methods.comparePassword = function (plainPassword: string) {
    const currentDocument = this;
    return bcrypt.compare(plainPassword, currentDocument.password);
  };

UserSchema.methods.generateToken=function(){
    const currentDocument=this
    return signJWT({ id:currentDocument.id },JWTSecret,{
        expiresIn:"1h"
})
}

UserSchema.statics.getUserFromToken = async function (token: string): Promise<IUser | null> {
    const user = this;
    const { id }: TokenPayload = await verifyJWT(token, JWTSecret); 
    const userData = await user.findById(id);
    return userData;
  };
const UserModel=mongoose.model("User",UserSchema)

UserModel.on("index", (err) => {
    if (err) {
      console.log("حصلت مشكلة في الـ index:", err.message);
    } else {
      console.log("Index done successfully ✅");
    }
})
module.exports=UserModel