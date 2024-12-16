import expressAsyncHandler from "express-async-handler";
import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";

interface IUser{
    firstName:string,
    lastName: string,
    email: string,
    password: string
}

interface UserLogin{
    email: string
    password: string
}

export const createUser= async function({firstName, lastName, email, password}:IUser){
if(!(firstName && lastName && email && password) ){
    throw new Error('All fields Required')
    }
const user = await User.create({
    fullName:{
        firstName,
        lastName
    }
, email, password})
return user;
}

export const userLoginService= async function({ email, password}:UserLogin){
    const existUser = await User.findOne({email}).select('+ password');
    if(!existUser)
        throw new ApiError(401,'Enter valid Email and Password')

    const pass= await existUser.comparePassword(password)
    if(!pass)
        throw new ApiError(401,'Enter valid Email and Password');

    const user= await User.findOne({email})
    if(!user)
        throw new ApiError(401,"User not found")

    const token = user.generateAuthToken()
    return {token, user}
}