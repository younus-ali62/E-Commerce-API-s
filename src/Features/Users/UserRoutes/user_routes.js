import UserController from "../UserController/user_controller.js";
import express from "express";

const user_controller=new UserController();
const userRouter=express.Router();
console.log("inside user router")
// userRouter.get("/signin",);
userRouter.post("/signIn",user_controller.signInController);

// userRouter.get("/signUp",);
userRouter.post("/signUp",user_controller.signUpController);
export default userRouter;