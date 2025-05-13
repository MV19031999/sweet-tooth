import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//New User
export const newUserReg = async(req, res) => {
    const name = (req.body.name).trim();
    const email = (req.body.email).trim().toLowerCase();
    const password = (req.body.password);


    //User exists
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({ success: false, message: "Email ID already registered" })
    }

    //Email Validation
    if(!validator.isEmail(email)){
        return res.status(400).json({ success: false, message: "Enter a valid Email ID" })
    }

    //Password Validation
    if(password.length < 5){
        return res.status(400).json({ success: false, message: "Password needs to be at least 5 characters" })
    }

    //Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //Creating the user
    const newUser = new User({
        "name": name[0].toUpperCase() + name.slice(1).toLowerCase(),
        "email": email,
        "password" : hashedPassword
    })

    try{
        const currentUser = await newUser.save();
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error - Unable to add user" })
    }
}

//Login
export const login = async(req, res) => {
    
    const email = (req.body.email).toLowerCase();
    const password = req.body.password;

    const currentUser = await User.findOne({email});
    if(!currentUser){
        return res.status(400).json({ success: false, message: "User not found"})
    }

    const isPwdMatch = await bcrypt.compare(password, currentUser.password);
    if(!isPwdMatch){
        return res.status(400).json({ success: false, message: "Please check Email ID or Password"})
    }

    try{
        const token = createToken(currentUser._id);
        const name = currentUser.name;
        res.status(200).json({ success: true, token, name, email})
    } catch(err) {
        res.status(500).json({ success: false, message: "Internal server error"})
    }
}

//Reset password
export const resetPwd = async(req, res) => {
    const {currPwd, newPwd} = req.body;
    const currentUser = await User.findById(req.user.userId);

    const isPwdMatch = await bcrypt.compare(currPwd, currentUser.password)
    if(!isPwdMatch){
        return res.status(400).json({ success: false, message: "Please check Password"})
    }

    const isOldPwd = await bcrypt.compare(newPwd, currentUser.password);
    if(isOldPwd){
        return res.status(400).json({ success: false, message: "New Password cannot be the same as old password"})
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPwd = await bcrypt.hash(newPwd, salt)

    try{
        await User.findByIdAndUpdate(req.user.userId, {"password" : newHashedPwd});
        res.status(200).json({ success: true, message: "Password changed! Please login again!"})
    } catch(err){
        console.log(err);
        res.status(400).json({ success: false, message: "Unable to change password"})
    }
}