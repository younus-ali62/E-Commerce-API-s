import { getDB } from "../../../config/mongodb.js";

export default class UserRepository {

  //method to register user
  async signUpUser(newUser,next) {
    try {
      const db = getDB();
      const collection = db.collection("Users");
      await collection.insertOne(newUser);
      const {_name,_email,_typeOfUser}=newUser;
      const finalData={_name,_email,_typeOfUser};
      return finalData;
    } catch (err) {
       next(err);
    }
  }

  //checking user by email
  async findByEmail(userEmail) {
    try {
      const db = getDB();
      const collection = db.collection("Users");
      const user = await collection.findOne({ _email: userEmail });
      return user;
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}
