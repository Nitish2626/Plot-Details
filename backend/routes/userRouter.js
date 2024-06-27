import { Router } from "express";
import { userLogin, userLogout, userSignup, verifyUser } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const userRouter= Router();

userRouter.post("/login",userLogin);
userRouter.post("/signup",userSignup);
userRouter.get("/status",verifyToken,verifyUser);
userRouter.get("/logout",userLogout);
