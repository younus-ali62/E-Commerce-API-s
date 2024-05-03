import {MongoClient} from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();
//connect nodejs to mongodb
const url=process.env.DB_URL;

const client=new MongoClient(process.env.DB_URL);
let newClient;
export const connectToMongodb=async()=>{

      await client.connect()
      .then(client=>{
        newClient=client;
        console.log("Mongodb is connected");
        createCounter(newClient.db())
      })
      .catch(err=>{
        console.log(err);
      })
};


export const getClient=()=>{
  return newClient;
}
export const getDB=()=>{
    return newClient.db();
}

const createCounter=async (db)=>{
  
  //checking counter is exist or not
  const createCounter=await db.collection("counter").findOne({_id:"cartItemId"});
  if(!createCounter){
    await db.collection("counter").insertOne({_id:"cartItemId", value:0});
  }
}

