import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignup = (async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            res.status(200).send("Account Already Exists Please Login !");
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                username,
                email,
                password: hashPassword
            });

            const token = jwt.sign({id: newUser._id.toString()}, `${process.env.JWT_SECRET}`);
            res.cookie("token", token, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
                signed: true
            });

            res.status(201).send("Account Created Successfully !");
        }
    }
    catch (error) {
        console.log("User Signup API", error);
        res.status(400).send("Unable To Create Account !");
    }
});

export const userLogin = (async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await userModel.findOne({ email });
        if (!userExists) {
            res.send({ "status": "404", "msg": "Account Not Exists Please Signup !" });
        }
        else {
            const isPasswordMatch = await bcrypt.compare(password, userExists.password);
            if (!isPasswordMatch) {
                res.send({
                    "status": "403", "msg": "Please Enter Valid Credentials !"
                });
            }
            else {
                const token = jwt.sign({id:userExists._id.toString()}, `${process.env.JWT_SECRET}`);
                res.cookie("token", token, {
                    path: "/",
                    domain: "localhost",
                    httpOnly: true,
                    signed: true
                });

                res.status(200).send({"user":userExists,"msg":"Logged In Successfully !"});
            }
        }
    }
    catch (error) {
        console.log("User Login API", error);
        res.status(400).send("Logged In Failed !");
    }
});

export const verifyUser=(async(req,res)=>{
    try {
        const user= await userModel.findById({_id: res.locals.jwtData.id}).select("-password");
        if(!user){
            res.send({"status":"404","msg":"Please Login"});
        }
        else{
            res.status(200).send({username:user.username,email:user.email});
        }
    }
    catch (error) {
        console.log("Verify User API",error);
        res.status(400).send("User Verification Failed");
    }
});

export const userLogout = (async (req, res) => {
    try {
        const clear=res.clearCookie("token");
        if(clear){
            res.status(200).send("Logout Successfully");
        }
        else{
            res.send({"status":"401","msg":"Something Went Wrong"});
        }
    }
    catch (error) {
        console.log("User Logout API",error);
        res.status(400).send("Unable To Logout User");
    }
});