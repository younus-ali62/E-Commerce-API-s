
import Users from "../UserModel/user_model.js";
import jsonwebtoken from "jsonwebtoken";
import ApplicationError from "../../../Error_Handler/error_handler.js";
const users=Users.getAllUsers();
export default class UserController{
 
    getAllUsers(req,res){
     return res.status(200).send(users);
    }
    signUpController(req,res){
     
        const userAlreadyExist=Users.userExist(req.body.email);
        if(userAlreadyExist){
            throw new ApplicationError("User already exist",409)
        }else{
            const result=Users.signUpUser(req.body);
            return  res.status(201).send(result);
        }
      
    }

    signInController(req,res){
        const result=Users.signInUser(req.body);
        
        if(result){
         const token=jsonwebtoken.sign({
          userId:result._id,
          userEmail:result._email
         },"a7eb0918c0eebd62760828edcb66071d8e2e8e9d12df0657f8d6740fb045bb9c",{expiresIn:2000});
         return (
         res
         .status(200)
         .json({ status: "success", msg: "login successfull", token })

         )
        }else {
      
        throw new ApplicationError("User not found",404);
        }
    }
}