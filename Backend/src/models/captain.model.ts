import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ICaptain extends mongoose.Document{
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    socketId?: string;
    status:string;
    vehicle:{
        color: string;
        vehicleType: string;
        plate: string;
        capacity: number;
    };
    location:{
        lat: number;
        lng: number;
    };
    hashPassword:(password:string)=> string
    generateAuthToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
}

const captainSchema= new mongoose.Schema<ICaptain>({
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
    },
    status:{
        type: 'string',
        enum:['available','busy'],
        default:'available'
    },
    vehicle:{
        color:{
            type: 'string',
            required: true
        },
        capacity:{
            type: 'number',
            required: true,
            min:[1,'capacity should be more than 1'],
        },
        plate:{
            type: 'string',
            required: true,
            unique: true
        },
        vehicleType:{
            type: 'string',
            required: true,
            enum:['car','bike','auto']
        }  
    },
    location:{
        lat:{
            type: 'number',
            required: false
        },
        lng:{
            type: 'number',
            required: false
        }
    },
})


// Encrypt the password before saving it to db.
captainSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
});

export const generateToken = captainSchema.methods.generateAuthToken = function (): string {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SCRETE!,{expiresIn:'24h'});
    return token;
};

captainSchema.methods.comparePassword = async function (
    candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const captainModel= mongoose.model<ICaptain>('Captain',captainSchema)