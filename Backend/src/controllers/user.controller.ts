import expressAsyncHandler from "express-async-handler";
import { User } from "../models/user.model";
import { Response, Request } from "express";
import { createUser, userLoginService } from "../services/user.service";
import { ApiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { AuthenticatedRequest } from "../middleware/auth.middleware";


export const userRegister = expressAsyncHandler(async(req: Request, res:Response)=>{
    const data = req.body;
    if(!data)
        throw new ApiError(404,'Fields required')
    const {email, password, firstName, lastName} = req.body;
    const existUser = await User.findOne({email});
    if(existUser)
        throw new ApiError(409, "User already exist");
    const user= await createUser({
        email, password, firstName, lastName
    })
    const token = user.generateAuthToken()
    res.send(new apiResponse(200,{user, token},"User register Sucessfully"))
})

export const userLogin = expressAsyncHandler(async(req: Request ,res: Response)=>{
    const {email, password}= req.body;
    if(!(email && password))
        throw new ApiError(500, 'please Enter Email and Password')

   try {
     const user= await userLoginService({email, password})
     res.cookie('token',user.token,{
        httpOnly:true,
        expires: new Date(Date.now() + 60*60*1000),
        secure:false, // set to true if your site is served over HTTPS
     })
     res.send(new apiResponse(200,user,"User Logged In successfully"))
   } catch (error) {
    throw new ApiError(400,"Error in Logged in")
   } 
})

export const userProfile = expressAsyncHandler(async(req: AuthenticatedRequest, res: Response)=>{
    res.send(new apiResponse(200,req.user,'user'))
})

export const userLogout= expressAsyncHandler(async(req: AuthenticatedRequest, res: Response)=>{
    const userId= req.user._id;
    if(!userId)
        throw new ApiError(404, 'User not found')
    await User.findByIdAndUpdate(userId, {$unset: {token: 1}},{
        new: true,
      })
      const option = {
        httpOnly: true,
        secure: true,
      };
        res
        .status(200)
        .clearCookie("token", option)
        .json(new apiResponse(200, {}, "User logged out"));
})