import {MongoClient} from "mongodb";

//connect nodejs to mongodb
const url="mongodb://127.0.0.1:27017/";
const client=new MongoClient(url);
let newClient;
export const connectToMongodb=async()=>{

      await client.connect()
      .then(client=>{
        newClient=client;
        console.log("Mongodb is connected");
      })
      .catch(err=>{
        console.log(err);
      })
};

export const getDB=()=>{
    return newClient.db("ecommerceDB");
}



