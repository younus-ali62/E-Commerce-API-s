
import Users from "../UserModel/user_model.js";

export default class UserController{

    signUpController(req,res){

        const result=Users.signUpUser(req.body);
        if(result){
          return  res.status(201).send("User added successfully")
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