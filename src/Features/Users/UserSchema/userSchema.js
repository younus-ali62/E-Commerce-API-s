
import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    name: String,
    email:{type:String, unique:true},
    password:String,
    typeOfUser:{type:String,enum:["customer","seller"]}
});
