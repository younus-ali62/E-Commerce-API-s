import Products from "../../Products/ProductModel/product_model.js";
import Users from "../../Users/UserModel/user_model.js";
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
      return { success: false, msg: "Product is not found" };
    }

    const validUserId = Users.validUser(userId);
    if (!validUserId) {
      return { success: false, msg: "User is not found" };
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
        return ({success:false,msg:"User is not found"});
    }
    const validCartId=cartArray.find(cart=>cart._id==cartItemId);
  
    if(!validCartId){
      return ({success:false,msg:"Cart is not found"});
    }

    const existingCartIndex=cartArray.findIndex(cart=> cart._id==cartItemId && cart._userId==userId);
    console.log(existingCartIndex);
    if(existingCartIndex>=0){
      cartArray.splice(existingCartIndex,1);
      return ({success:true,msg:"cart is deleted"})
    }else{
      return ({success:false,msg:"Oops! It seems like you're trying to delete a cart that you didn't create."});
    }
   
  }
}

const cartArray = [new CartModel(1, 1, 1, 1)];
