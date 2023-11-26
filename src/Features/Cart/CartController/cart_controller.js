import CartModel from "../CartModel/cart_model.js";
export default class CartController{

    addItemsController(req,res){
        
        const {productId,quantity}=req.query;
        const userId=req.userId;
  
        const result=CartModel.addItems(productId,userId, quantity);
        if(result.success){
            return res.status(201).send(result);
        }else {
            return res.status(400).send(result);
        }
    
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
       
        if(result.success){
            return res.status(200).send(result);
        }else{
            return res.status(400).send(result);
        }
    }
}