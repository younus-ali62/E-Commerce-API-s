import UserController from "../UserController/user_controller.js";
import express from "express";

const user_controller=new UserController();
const userRouter=express.Router();

userRouter.get("/",user_controller.getAllUsers);
userRouter.post("/login",(req,res,next)=>{
    user_controller.signInController(req,res,next)
});

// userRouter.get("/signUp",);
userRouter.post("/register",(req,res,next)=>{
    user_controller.signUpController(req,res,next);
});
export default userRouter;