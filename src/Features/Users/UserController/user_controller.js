
import Users from "../UserModel/user_model.js";

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
          return  res.status(200).send("User is login successfully")
        }else {
          return  res.status(404).send("Incorrect Credentials or User is not exist!")
        }
    }
}