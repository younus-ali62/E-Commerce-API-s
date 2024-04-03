
import express from "express";
import CartController from "../CartController/cart_controller.js";
const cartController=new CartController();
const cartRouter=express.Router();

cartRouter.post("/",(req,res)=>{
    cartController.addItemsController(req,res)
});
cartRouter.get("/",(req,res)=>{
    cartController.getSpecificCart(req,res)
});
cartRouter.get("/deleteCart/:id",(req,res)=>{
    cartController.deleteCart(req,res)
});
export default cartRouter;