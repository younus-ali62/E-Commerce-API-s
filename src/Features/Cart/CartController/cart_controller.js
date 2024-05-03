import {CartModel} from "../CartModel/cart_model.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../../../Error_Handler/error_handler.js";
import { CartRepository } from "../CartRepository/cart_repository.js";
export default class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  //method to add items into cart db
  async addItemsController(req, res) {
    try {
      let { productId, quantity } = req.body;
      const userId = req.userId;
      productId=new ObjectId(productId);
      const result = await this.cartRepository.addItems(
        productId,
        userId,
        quantity
      );
      return res.status(200).send("Cart has been added");
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong")
    }
  }

  //method to get a specific cart
   async getSpecificCart(req, res) {
    const userId = req.userId;
    const result=await this.cartRepository.getItems(userId);
 
    res.status(200).send(result);
  }

  //method to delete a cart 
  async deleteCart(req, res) {
    const cartItemId = req.params.id;
    const userId=req.userId;
    const result=await this.cartRepository.deleteCart(cartItemId,userId);
    if(result){
      return res.status(202).send("Cart is removed");
    }
     else {
      return res.status(400).send("Cart is not found ")
     }
  }
}
