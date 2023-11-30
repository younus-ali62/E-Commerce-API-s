import Products from "../../Products/ProductModel/product_model.js";
import Users from "../../Users/UserModel/user_model.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
export default class CartModel {
  constructor(_id, _productId, _userId, _quantity) {
    this._id = _id;
    this._productId = _productId;
    this._userId = _userId;
    this._quantity = _quantity;
  }

  static addItems(productId, userId, quantity) {
   
    const validProductId = Products.validProductId(productId);

    if (!validProductId) {
      throw new ApplicationError("Product is not found",404)//404-> not found
    }

    const validUserId = Users.validUser(userId);
    if (!validUserId) {
      throw new ApplicationError("User is not found",404)
    }

     //checking card is already created for user or not pending
    const newCart = new CartModel(
      cartArray.length + 1,
      productId,
      userId,
      quantity
    );
    cartArray.push(newCart);
    return { success: true, msg: cartArray };
  }

  static get(userId) {
    return cartArray.filter((cart) => userId == cart._userId);
  }

  static deleteCart(cartItemId,userId){
 
    const validUserId=Users.validUser(userId);
 
    if(!validUserId){
      throw new ApplicationError("User is not found",404)
     
    }
    const validCartId=cartArray.find(cart=>cart._id==cartItemId);
  
    if(!validCartId){
      throw new ApplicationError("Cart is not found");
   
    }

    const existingCartIndex=cartArray.findIndex(cart=> cart._id==cartItemId && cart._userId==userId);
    
    if(existingCartIndex>=0){
      cartArray.splice(existingCartIndex,1);
      return ({success:true,msg:"cart is deleted"})
    }else{
      throw new ApplicationError("You do not have permission to delete this cart.",403)//forbidden (403 status code)
    }
   
  }
}

const cartArray = [new CartModel(1, 1, 1, 1)];
