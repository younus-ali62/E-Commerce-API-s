// Using ES6 imports
import mongoose from 'mongoose';

const url=process.env.DB_URL;

export const connectUsingMongoose=async()=>{
    try{
       await mongoose.connect(url);
       console.log("Mongodb is connected")
    }
    catch(err){
        console.log("Failed in connecting to mongodb")
    }
}