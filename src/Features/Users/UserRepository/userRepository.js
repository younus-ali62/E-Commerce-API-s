import { ObjectId } from "mongodb";
import ApplicationError from "../../../Error_Handler/error_handler.js";
import { getDB } from "../../../config/mongodb.js";

export class UserRepository {

  constructor(){
    this.collection="Users";
  }
  //method to register user
  async signUpUser(newUser) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newUser);
      const {_name,_email,_typeOfUser}=newUser;
      const finalData={_name,_email,_typeOfUser};
      return finalData;
    } catch (err) {
       throw new ApplicationError("Something went wrong with database. Try again later!",500);
    }
  }

  //checking user by email
  async findByEmail(userEmail) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const user = await collection.findOne({ _email: userEmail });
      return user;
    } catch (err) {
      throw new ApplicationError("Something went wrong with database. Try again later!",500);
    }
  };

  //find user by id
  async findById(userId){
    try{
      const db=getDB();
      const collection=db.collection(this.collection);
      const result=await collection.findOne({_id:new ObjectId(userId)});
      return result;
    }catch(err){
      throw new ApplicationError("Something went wrong with database. Try again later!",500);
    }
  }
}
