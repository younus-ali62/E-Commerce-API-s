//importing neccessary modules and packages
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swagger from "swagger-ui-express";
import {readFile} from "fs/promises";
import  ProductRouter from "./src/Features/Products/ProductRoutes/productsRoutes.js";
import userRouter from "./src/Features/Users/UserRoutes/user_routes.js";
import cartRouter from "./src/Features/Cart/CardRouter/cart_routes.js";
import { basic_authorization } from "./src/Middlewares/Basic_Authentication/basic_authentication.js";
import { jwtAuthorization } from "./src/Middlewares/JWT Middleware/jwt_middleware.js";


//read and parse json file
const apiDocs = JSON.parse(
    await readFile(
      new URL('./swagger.json', import.meta.url)
    )
  );

//creating a server
const app=express();

//defining a port
const port=3000;

//making public folder publicly accessible
app.use(express.static("Public"));

//using cookie parser middleware
app.use(cookieParser())

//parsing the user data using bodyparser and json
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//handling route for swagger ui 
app.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

//Handling Routes for Products Requests
app.use("/api/products",jwtAuthorization, ProductRouter);

//Handling Routes for Users Requests
app.use("/api/users",userRouter);

//handling Routes for card requests
app.use("/api/cart",jwtAuthorization,cartRouter);

//handling a default request from client
app.get("/",(req,res)=>{
    res.send("Welcome to my E-Commerce API");
});


//handling an API call which does not exist in our documentation
app.use((req,res)=>{
  res.status(404).json({success:"failure",message:`Invalid url ${req.originalUrl}. Please check our documentation for all API calls available http://localhost:3000/api-docs`})
});
//Server 
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
});

