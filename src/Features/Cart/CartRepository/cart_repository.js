import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import {CartModel} from "../CartModel/cart_model.js"


export class CartRepository{

    constructor(){
        this.collection="cartItems";
    }

    //method to add items 
    async addItems(productId,userId, quantity){
        try{

            //get db
            const db=getDB();
            
            //get collection
            const collection=db.collection(this.collection);

            //getting the id
            const cartId=await this.getNextCounterValue(db);
    
            await collection.updateOne(
                {_productId:new ObjectId(productId),_userId:new ObjectId(userId)},
                { 
                   $setOnInsert:{_id:cartId},
                   $inc: { _quantity: quantity } },
                {upsert:true},
             
            )
          
        }
        catch(err){
            console.log(err);
        }
    }

    //method to get all products of user from cart items
    async getItems(userId){
        try{
            //get db
             const db=getDB();

             //get collection
              const collection=db.collection(this.collection);

              const result=await collection.find({_userId: userId}).toArray();
            
              return result;
        }
        catch(err){
            console.log(err);
            return res.status(400).send("Something went wrong")
        }
       
    }

    //method to delete a cart
    async deleteCart(cartId,userId){
        try
        {
         const db=getDB();
         const collection=db.collection(this.collection);
         const result=await collection.deleteOne({_id:new ObjectId(cartId), _userId:new ObjectId(userId)});
       
         return result.deleteCount>0;
        }
        catch(err){
            console.log(err);
        }
    }

    async getNextCounterValue(db){
       const resultDocument= await db.collection("counter").findOneAndUpdate(
            {_id:"cartItemId"},
            {$inc:{value:1}},
            {returnDocument:"after"});

    
       return resultDocument.value;

    }
}