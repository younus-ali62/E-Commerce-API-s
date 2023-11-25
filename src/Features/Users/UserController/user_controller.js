
import Users from "../UserModel/user_model.js";
import jsonwebtoken from "jsonwebtoken";

export default class UserController{

    signUpController(req,res){
        // console.log(req.headers);
        const result=Users.signUpUser(req.body);
    
        if(result){
          return  res.status(201).send(result);
        }else{
          return  res.status(404).send("Something went wrong")
        }
    }

    signInController(req,res){
        const result=Users.signInUser(req.body);
    
        if(result){
         const token=jsonwebtoken.sign({
          userId:result._id,
          userEmail:result._email
         },"a7eb0918c0eebd62760828edcb66071d8e2e8e9d12df0657f8d6740fb045bb9c",{expiresIn:"10h"});
         return (
         res
         .status(200)
         .cookie("jwtToken",token,{ maxAge: 1 * 60 *  1000, httpOnly: false })
         .json({ status: "success", msg: "login successfull", token })

         )
        }else {
          return  res.status(404).send("Incorrect Credentials or User is not exist!")
        }
    }
}