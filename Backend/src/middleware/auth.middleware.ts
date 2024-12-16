import Jwt from 'jsonwebtoken'
import { User  } from '../models/user.model'
import expressAsyncHandler from 'express-async-handler'
import { ApiError } from '../utils/apiError'
import { Request } from 'express'
import { captainModel } from '../models/captain.model'
export interface AuthenticatedRequest extends Request {
    user?: typeof User.prototype;
}

export interface CaptainAuthenticateRequest extends Request{
    captain?: typeof captainModel.prototype;
}

export const userAutherized= expressAsyncHandler(async(req: AuthenticatedRequest, res, next)=>{
   try {
     const token = req.cookies.token ||req.header("Authorization")?.replace("bearer ","")
 
     if(!token)
         throw new ApiError(401, "Unautherized Access")
     const jwtSecret = process.env.JWT_SCRETE;
     if (!jwtSecret) {
         throw new ApiError(500, "JWT secret is not defined");
     }
 
     const decodedJWT=Jwt.verify(token, jwtSecret) as { _id: string };
     
     const user=await User.findById(decodedJWT?._id).select("-password")
     req.user=user 
     next()
   } catch (error) {
    throw new ApiError(401,"Invalid requst")
   }
})

export const captainAutherize= expressAsyncHandler(async(req: CaptainAuthenticateRequest, res, next)=>{
    try {
      const token = req.cookies.token ||req.header("Authorization")?.replace("bearer ","")
  
      if(!token)
          throw new ApiError(401, "Unautherized Access")
      const jwtSecret = process.env.JWT_SCRETE;
      if (!jwtSecret) {
          throw new ApiError(500, "JWT secret is not defined");
      }
  
      const decodedJWT=Jwt.verify(token, jwtSecret) as { _id: string };
      
      const user=await captainModel.findById(decodedJWT?._id).select("-password")
      req.captain=user 
      next()
    } catch (error) {
     throw new ApiError(401,"Invalid requst")
    }
 })