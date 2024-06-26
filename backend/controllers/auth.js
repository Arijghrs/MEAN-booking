import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register = async(req,res,next) => {
    try{
        const salt= bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        console.log("here")

        const newUser = User ({
            ...req.body,
            password : hash,
        });

        await newUser.save();
        res.status(200).json(newUser);
    }catch(error){
        next(error);
    }
};

export const login = async(req,res,next) => {
    try{
        const user = await User.findOne ({username: req.body.username});
        const userId =user._id;
        if (!user) return next(createError(404,"user not found"));

        const IsPasswordCorrect = bcrypt.compare( req.body.password , user.password);
        if (!IsPasswordCorrect) return next(createError(400,"password incorrect"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, username: user.username}, process.env.JWT)
        console.log(token)
        
        const {password , isAdmin, ...otherDetails}= user._doc//This syntax is using object destructuring to extract specific properties from the user
       
        res
        .cookie("access_token", token, {
           httpOnly: true,})
        .status(200)
        .json({token,userId});
    
    }catch(error){
        next(error);
    }
};
