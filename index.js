//importing neccessary modules and packages
import express from "express";
import bodyParser from "body-parser";
import  ProductRouter from "./src/Features/Products/ProductRoutes/productsRoutes.js";
import userRouter from "./src/Features/Users/UserRoutes/user_routes.js";
import { basic_authorization } from "./src/Middlewares/Basic_Authentication/basic_authentication.js";

import { jwtAuthorization } from "./src/Middlewares/JWT Middleware/jwt_middleware.js";
import cookieParser from "cookie-parser";

//creating a server
const app=express();

//defining a port
const port=3000;


app.use(express.static("Public"));
app.use(cookieParser())
//parsing the user data using bodyparser and json
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Handling Routes for Products Requests
app.use("/api/products",jwtAuthorization, ProductRouter);

//Handling Routes for Users Requests
app.use("/api/users",userRouter);
//handling a default request from client
app.get("/",(req,res)=>{
    res.send("Welcome to my E-Commerce API");
})
//Server 
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
});

