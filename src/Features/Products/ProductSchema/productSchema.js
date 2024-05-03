import mongoose  from "mongoose";

export const productSchema =new mongoose.Schema({
    productName:String,
    description:String,
    category:String,
    price:Number,
    inStock:Number
});