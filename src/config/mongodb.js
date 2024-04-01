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
      })
      .catch(err=>{
        console.log(err);
      })
};

export const getDB=()=>{
    return newClient.db();
}



