import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
export class ProductRepository {
  constructor() {
    this.collection = "Products";
  }
  //to add a new product to Products collection
  async addProduct(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      throw new ApplicationError(
        "Something went wrong with database. Try again later!",
        500
      );
    }
  }

  //to get all the products
  async getAllProducts(next) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.find().toArray();
      return result;
    } catch (err) {
      throw new ApplicationError(
        "Something went wrong with database. Try again later!",
        500
      );
    }
  }

  //to get a specific product based on id
  async getSpecificProduct(productId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.findOne({ _id: new ObjectId(productId) });

      return result;
    } catch (err) {
      throw new ApplicationError(
        "Something went wrong with database. Try again later!",
        500
      );
    }
  }

  //to filter the products
  async filterProducts(minPrice, maxPrice, category) {
    try {
      const filterProducts = {};
      if (minPrice && maxPrice) {
        filterProducts._price = {
          $gte: parseFloat(minPrice),
          $lte: parseFloat(maxPrice),
        };
      } else if (minPrice) {
        filterProducts._price = { $gte: parseFloat(minPrice) };
      } else if (maxPrice) {
        filterProducts._price = { $lte: parseFloat(maxPrice) };
      }
      if (category) {
        filterProducts._category = category;
      }
      console.log(filterProducts);
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.find(filterProducts).toArray();
      return result;
    } catch (err) {
      throw new ApplicationError(
        "Something went wrong with database. Try again later!",
        500
      );
    }
  }

  //to rate the products
  async rateProduct(userId, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      //removing existing entry
      await collection.updateOne({_id:new ObjectId(productId)},{
        $pull:{ratings:{userId:new ObjectId(userId)}}
      });

      //adding new entry
       await collection.updateOne(
          { _id: new ObjectId(productId) },
          { $push: { ratings: { userId:new ObjectId(userId), rating } } }
        );
    } catch (err) {
      throw new ApplicationError(
        "Something went wrong with database. Try again later!",
        500
      );
    }
  }

  //checking user by Id
  async findById(userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = collection.findOne({ _id: new ObjectId(userId) });
      return result;
    } catch (err) {
      throw new ApplicationError(
        "Something went wrong with database. Try again later!",
        500
      );
    }
  }
}
