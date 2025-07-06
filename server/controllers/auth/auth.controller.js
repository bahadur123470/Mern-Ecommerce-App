import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../../models/user.js";

export const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            username, email, password: hashPassword
        })
        await newUser.save()
        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        }
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: userResponse,
        })
    }
    catch (e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
export const login = async (req, res) => {
    try{

    }
    catch (e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}