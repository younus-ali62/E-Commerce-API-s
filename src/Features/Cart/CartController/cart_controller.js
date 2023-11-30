import CartModel from "../CartModel/cart_model.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
export default class CartController{

    addItemsController(req,res){
        
        const {productId,quantity}=req.query;
        const userId=req.userId;
  
        const result=CartModel.addItems(productId,userId, quantity);
        
    
    }
    getSpecificCart(req,res){
        
        const userId=req.userId;
        const result=CartModel.get(userId);
        res.status(200).send(result);
    }

    deleteCart(req,res){
        const cartItemId=req.query.cartItemId;
        const userId=req.userId;
        const result=CartModel.deleteCart(cartItemId,userId);
      
    }
}