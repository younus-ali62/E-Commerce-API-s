import mongoose, { mongo } from "mongoose";

export const cartSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"Products"
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"Users"
    },
    quantity:Number
})