import expressAsyncHandler from "express-async-handler";
import { Response, Request } from "express";
import { ApiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { captainLoginService, captainService } from "../services/captain.service";
import { ResultFactory, validationResult } from "express-validator";
import { AuthenticatedRequest, CaptainAuthenticateRequest } from "../middleware/auth.middleware";
import { captainModel } from "../models/captain.model";

export const captainRegistration= expressAsyncHandler(async(req: Request, res: Response)=>{
    const data = req.body;
    if(!data)
        throw new ApiError(500, "Please Enter All Fields")
  const {firstName, lastName, email, password,capacity, vehicleType, plate, color, lat, lng} = data;

try {
      const captain = await captainService({
        firstName, lastName, email, password,capacity, vehicleType, plate, color, lat, lng
      })
        const token = captain.generateAuthToken();
        if(!token)
            throw new ApiError(400,"Token not generated")
        res.send(new apiResponse(200,{captain, token},"Captain register Sucessfully"))
} catch (error) {
    console.error(error);
    throw new ApiError(400,'Error creating Captain')
}
})

export const captainLogin = expressAsyncHandler(async(req: Request ,res: Response)=>{
    const {email, password}= req.body;
    if(!(email && password))
        throw new ApiError(500, 'please Enter Email and Password')

   try {
     const captain= await captainLoginService({email, password})
     res.cookie('token',captain.token,{
        httpOnly:true,
        expires: new Date(Date.now() + 60*60*1000),
        secure:false, // set to true if your site is served over HTTPS
     })
     res.send(new apiResponse(200,captain,"Captain Logged In successfully"))
   } catch (error) {
    throw new ApiError(400,"Error in Logged in")
   } 
})

export const captainLogout= expressAsyncHandler(async(req:CaptainAuthenticateRequest, res: Response)=>{
    const userId= req.captain._id;
    if(!userId)
        throw new ApiError(404, 'Captain not found')
    await captainModel.findByIdAndUpdate(userId, {$unset: {token: 1}},{
        new: true,
      })
      const option = {
        httpOnly: true,
        secure: true,
      };
        res
        .status(200)
        .clearCookie("token", option)
        .json(new apiResponse(200, {}, "Captain logged out"));
})

export const captainProfile= expressAsyncHandler(async(req: CaptainAuthenticateRequest ,res: Response)=>{
  res.send(new apiResponse(200,req.captain,'Captain Profile fetched successfully'))
} )