
import express from "express";
import CartController from "../CartController/cart_controller.js";
const cartController=new CartController();
const cartRouter=express.Router();

cartRouter.post("/",cartController.addItemsController);
cartRouter.get("/",cartController.getSpecificCart);
cartRouter.get("/deleteCart",cartController.deleteCart);
export default cartRouter;