import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends mongoose.Document {
    _id: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    email: string;
    password: string;
    socketId?: string;
    hashPassword:(password:string)=> string
    generateAuthToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
  }

const userSchema= new mongoose.Schema<IUser>({
    fullName:{
        firstName:{
            type: 'string',
            required: true,
            minlength:[3,'first name is too short']
        },
        lastName:{
            type: 'string',
            required: true,
            minlength:[3,'last name is too short']
        }
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password:{
        type: 'string',
        required: true,
        select: false
    },
    socketId:{
        type: 'string',
    }
})


export const generateToken = userSchema.methods.generateAuthToken = function (): string {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SCRETE!,{expiresIn:'24h'});
    return token;
};

userSchema.methods.comparePassword = async function (
    candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// userSchema.methods.hashPassword = async function (){
//     return bcrypt.hash(this.password,10)
// }

// Encrypt the password before saving it to db.
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})
    

export const User = mongoose.model<IUser>('User', userSchema);