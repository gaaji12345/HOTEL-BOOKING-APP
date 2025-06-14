

import express,{Request,Response} from "express";

import User from "../models/user";


import jwt from "jsonwebtoken";


const router=express.Router();



import { check, validationResult } from "express-validator";


router.post("/register",[check("firstName","FirstName is required").isString(),
    check("lastName","LastName is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password is required").isLength({min:6}),

],async (req:any,res:any)=> {
    const  error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message:error.array()});
    }
    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            res.status(400).json({message:"Email already exists"});
        }
        user=new User(req.body);
        await user.save();

        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{
            expiresIn:"1d"
            }
        );

        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== "production",
            maxAge:86400000,

        });
        return res.sendStatus(200)

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong"});

    }
})

export default router;

