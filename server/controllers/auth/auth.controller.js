import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../../models/user.js";

export const registerUser = async (req, res) => {
    try{
        console.log('RegisterUser request body:', req.body);
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
        console.log('RegisterUser error:', e);
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
            return res.json({
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
            id: checkUser._id,
            role: checkUser.role, 
            email: checkUser.email,
            username: checkUser.username
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60mins'})
        res.cookie('token', token, {httpOnly: true, secure: false, }).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                username: checkUser.username
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
export const logoutUser = async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully"
    })
}
export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success: false,
        message: 'Unauthorized user!'
    })
    try{
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next()
    } catch(error){
        res.status(401).json({
            success: false,
            message: 'Unauthorized user! '
        })
    }
}