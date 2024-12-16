
import { ApiError } from "../utils/apiError";
import { captainModel } from "../models/captain.model";


interface ICaptain{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    socketId?: string;
    color: string;
    vehicleType: string;
    plate: string;
    capacity: number;
    lat: number;
    lng: number;
}

interface CaptainLogin{
    email: string
    password: string
}

export const captainService= async function({firstName, lastName, email, password,capacity, vehicleType, plate, color, lat, lng}: ICaptain){
    if(!(firstName && lastName && email && password && capacity && vehicleType && plate && color && lat && lng))
    throw new ApiError(400, "Csptain Fields required")

   try {
     const captain = await captainModel.create({
         fullName:{
             firstName,
             lastName
         },
         email,
         password,
         vehicle:{
         capacity,
         vehicleType,
         plate,
         color,
         },
         location: {
             lat,
             lng
         }
     })
    return captain;
   } 
   catch (error) {
    console.error(error);
    throw new ApiError(400, 'Error Registring Captain');
   }
}


export const captainLoginService= async function({
    email,
    password
}:CaptainLogin){
    console.log(email,password)
     const existCaptain = await captainModel.findOne({email}).select('+ password');
        if(!existCaptain)
            throw new ApiError(401,'Enter valid Email and Password')
    
        const pass= await existCaptain.comparePassword(password)
        if(!pass)
            throw new ApiError(401,'Enter valid Email and Password');
    
        const captain= await captainModel.findOne({email})
        if(!captain)
            throw new ApiError(401,"Captain not found")
    
        const token = captain.generateAuthToken()
        return {token, captain}
}