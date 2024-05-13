import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        country:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true,
            unique:true
        },
        phone:{
            type:String,
            require:true,
        },
        isAdmin:{
            type: Boolean,
            default:false,
        }
    },
    {
        timestamps : true 
    }
);

const User = mongoose.model("User", UserSchema);

export default User;