import Users from "../UserModel/user_model.js";
import jsonwebtoken from "jsonwebtoken";
import UserRepository from "../UserRepository/userRepository.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
const users = Users.getAllUsers();
// const userRepo=new UserRepository();
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
      const checkingUser = await this.userRepository.existUser(email);
      if (checkingUser) {
        throw new ApplicationError("User already exist", 409);
      } else {
        const newUser = new Users(name, email, password, typeOfUser);
        const result = await this.userRepository.signUpUser(newUser, next);//will return newUser or else undefined
        if (result) {
          return res.status(201).send(newUser);
        }
      }
    } catch (err) {
      console.log("Error: ", err);
      next(err); // the error will be passed to the global error handler middleware.
    }
  }

  //controller method to signin the user
  signInController(req, res) {
    const result = Users.signInUser(req.body);

    if (result) {
      const token = jsonwebtoken.sign(
        {
          userId: result._id,
          userEmail: result._email,
        },
        "a7eb0918c0eebd62760828edcb66071d8e2e8e9d12df0657f8d6740fb045bb9c",
        { expiresIn: 2000 }
      );
      return res
        .status(200)
        .json({ status: "success", msg: "login successfull", token });
    } else {
      throw new ApplicationError("User not found", 404);
    }
  }
}
