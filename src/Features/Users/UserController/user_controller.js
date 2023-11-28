
import Users from "../UserModel/user_model.js";
import jsonwebtoken from "jsonwebtoken";
const users=Users.getAllUsers();
export default class UserController{
 
    getAllUsers(req,res){
     return res.status(200).send(users);
    }
    signUpController(req,res){
        const userAlreadyExist=Users.userExist(req.body.email);
        if(userAlreadyExist){
            return res.status(409).send("User already exist");
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
         },"a7eb0918c0eebd62760828edcb66071d8e2e8e9d12df0657f8d6740fb045bb9c",{expiresIn:300});
         return (
         res
         .status(200)
         .json({ status: "success", msg: "login successfull", token })

         )
        }else {
          return  res.status(404).send("User is not found")
        }
    }
}