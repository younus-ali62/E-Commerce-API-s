import UserController from "../UserController/user_controller.js";
import express from "express";

const user_controller=new UserController();
const userRouter=express.Router();

userRouter.get("/",user_controller.getAllUsers);
userRouter.post("/login",user_controller.signInController);

// userRouter.get("/signUp",);
userRouter.post("/register",user_controller.signUpController);
export default userRouter;