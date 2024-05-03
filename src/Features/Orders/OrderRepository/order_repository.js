
import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../../config/mongodb.js";
import { CartRepository } from "../../Cart/CartRepository/cart_repository.js";
import OrdersModel from "../OrderModel/order_model.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
// import { get } from "request";

export class OrderRepository{
    constructor(){
        this.collection="orders";
        this.cartRepo=new CartRepository();
    }

    async placeOrder(userId){
          //for transaction
          const client=getClient();
        const session= client.startSession();
        // console.log(session);
        session.startTransaction();
        try{
           const db=getDB();
            //1 create a cart items and get total amount
          const result=  await this.getTotalAmount(userId,session);
          console.log(result);
          const totalAmount= result.reduce((acc,item)=> acc+item.totalAmount,0);

          //2 create a order record model
          const newOrder= new OrdersModel(userId,totalAmount,new Date());
           await db.collection(this.collection).insertOne(newOrder,{session});

           //3 reduce the stock
           for(let item of result){
               await db.collection("Products").updateMany(
                {_id: item._productId},
                {$inc:{stock: -item._quantity}},{session}
               )
           }
           throw new Error(
            "Something went wrong with database. Try again later!"
          );

           //4 clear the cart items
           await db.collection("cartItems").deleteMany(
            {_userId: new ObjectId(userId)},{session}
           )
           await session.commitTransaction();// update db
           session.endSession();
           return;
        }
       
        catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log(err);
        }
    }

    async getTotalAmount(userId,session){
        const db=getDB();
       
        const items = await db.collection("cartItems").aggregate([
            // 1. Get cart items for the user
            {
                $match:{_userId:new ObjectId(userId)}
            },
            // 2. Get the products form products collection.
            {
                $lookup:{
                    from:"Products",
                    localField:"_productId",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },
            // 3. Unwind the productinfo.
            {
                $unwind:"$productInfo"
            },
            // 4. Calculate totalAmount for each cartitems.
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo._price", "$_quantity"]
                    }
                }
            }
        ],{session}).toArray();
        
        return items;
    };

  
}