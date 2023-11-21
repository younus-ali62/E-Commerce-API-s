//importing neccessary modules and packages
import express from "express";
import  ProductRouter from "./src/Features/Products/ProductRoutes/productsRoutes.js"


//creating a server
const app=express();

//defining a port
const port=3000;

//Handling Routes for Products Requests
app.use("/api/products",ProductRouter);

//handling a default request from client
app.get("/",(req,res)=>{
    res.send("Welcome to my E-Commerce API");
})
//Server 
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})