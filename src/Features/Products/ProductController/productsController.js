import { ProductRepository } from "../ProductRepository/product_repository.js";
import {UserRepository } from "../../Users/UserRepository/userRepository.js"
import Products from "../ProductModel/product_model.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
const products = Products.getProducts();
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
    this.userRepository=new UserRepository();
  }

  async getAllProducts(req, res, next) {
    try {
      const result = await this.productRepository.getAllProducts();
      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  //controller to add a new product
  async addProduct(req, res, next) {
    try {
      const { name, description, category, price, size } = req.body;
      const imageName = req.file.filename;
      const newProduct = new Products(
        name,
        description,
        category,
        parseFloat(price),
        size,
        imageName
      );
      const result = await this.productRepository.addProduct(newProduct);
      return res.status(201).send(result);
    } catch (err) {
      next(err);
    }
  }

  async rateProduct(req, res,next) {
    try{
      const userId=req.userId;
      const userEmail=req.userEmail;
      const {productId, rating } = req.query;

      //checking user is present or not
      const checkUser=await this.userRepository.findById(userId);
      if(!checkUser){
        throw new ApplicationError("User not found!",400)
      }

      //checking product is found or not
      const checkProduct= await this.productRepository.findById(productId);
      if(!checkProduct){
        throw new ApplicationError("Product not found!",400);
      }

      const result=await this.productRepository.rateProduct(userId,productId,rating);
      return res.status(200).send(result)
    }catch(err){
      next(err);
    }

  }

  async getSpecificProductController(req, res, next) {
    try {
      const productId = req.params.id;
      const result = await this.productRepository.getSpecificProduct(productId);
      if (result) {
        return res.status(200).send(result);
      } else {
        throw new ApplicationError("Product not found!", 400);
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllFilterProducts(req, res, next) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;
      const result = await this.productRepository.filterProducts(
        minPrice,
        maxPrice,
        category
      );
      if(result){
        return res.status(200).send(result);
      }else{
        throw new ApplicationError("Product not found!",400);
      }
      
    } catch (err) {
      next(err);
    }
  }
}
