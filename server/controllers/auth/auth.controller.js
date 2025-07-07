import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../../models/user.js";

export const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body
        const checkUser = await User.findOne({ email});
        if (checkUser)
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            }) 
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
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const checkUser = await User.findOne({ email})
        if (!checkUser){
            res.json({
                success: false ,
                message: "User doesn't exist with this email , please register first"
            })
        }
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if (!checkPasswordMatch){
            return res.json({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({
            id: checkUser._id, role: checkUser.role, email: checkUser.email
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60mins'})
        res.cookie('token', token, {httpOnly: true, secure: false, }).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,

            }
        })
    }
    catch (e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}