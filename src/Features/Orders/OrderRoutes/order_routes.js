import express from "express";
import { OrderController } from "../OrderController/order_controller.js";
const orderRouter= express.Router();
const orderController=new OrderController();

//route to place the order
orderRouter.post("/",(req,res,next)=>{
    orderController.placeOrder(req,res,next);
})

export default orderRouter;