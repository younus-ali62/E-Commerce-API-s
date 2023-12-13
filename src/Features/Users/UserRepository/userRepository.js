import { getDB } from "../../../config/mongodb.js";

export default class UserRepository {
  async signUpUser(newUser,next) {
    try {
      const db = getDB();
      const collection = db.collection("Users");
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
       next(err);
    }
  }

  async existUser(userEmail) {
    try {
      const db = getDB();
      const collection = db.collection("Users");
      const user = await collection.findOne({ _email: userEmail });
      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}
