import Users from "../UserModel/user_model.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserRepository} from "../UserRepository/userRepository.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
const users = Users.getAllUsers();

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  //controller to get all the users
  getAllUsers(req, res) {
    return res.status(200).send(users);
  }

  //controller to handle the register route for user
  async signUpController(req, res, next) {
    
    try {
      const { name, email, password, typeOfUser } = req.body;
      const checkingUser = await this.userRepository.findByEmail(email);
      if (checkingUser) {
        throw new ApplicationError("User already exist", 409);
      } else {
      
        const hashedUserPassword = await bcrypt.hash(password, 12);
        const newUser = new Users(name, email, hashedUserPassword, typeOfUser);
        const result = await this.userRepository.signUpUser(newUser, next);//will return newUser or else undefined
      
        if (result) {
          return res.status(201).send(result);
        }
      }
    } catch (err) {
      next(err); // the error will be passed to the global error handler middleware.
    }
  }

  //controller method to signin the user
  async signInController(req, res, next) {
 
    try {
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        throw new ApplicationError("User not found or Invalid Credentials!",400);
      } else {
   
        const result = await bcrypt.compare(req.body.password, user._password);
        if (result) {
          const token = jsonwebtoken.sign(
            {
              userId: user._id,
              userEmail: user._email,
            },
            process.env.JWT_SECRET,
            { expiresIn: 2000 }
          );
          return res
            .status(200)
            .json({ status: "success", msg: "login successfull", token });
            
        }
      }
    } catch (err) {
      next(err);
    }
  }
}
