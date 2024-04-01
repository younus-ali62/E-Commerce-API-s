import express from "express";
import ProductController from "../ProductController/productsController.js";
import { fileUpload} from "../../../Middlewares/fileUploadMiddleware.js";
const productController=new ProductController();
const productRouter= express.Router();


//already gone through localhost:3000/api/products

//route to fetch all the products
productRouter.get("/",(req,res,next)=>{
    productController.getAllProducts(req,res,next);
});

//route to add new product
productRouter.post("/",fileUpload.single("imgUrl"),(req,res,next)=>{
    productController.addProduct(req,res,next);
});


//route to filter products
productRouter.get("/filter-products",(req,res,next)=>{
    productController.getAllFilterProducts(req,res,next);
});


//route to rate the product
productRouter.post("/rate-product",(req,res,next)=>{
    productController.rateProduct(req,res,next);
});

//route to get a specific product from db
productRouter.get("/:id",(req,res,next)=>{
    productController.getSpecificProductController(req,res,next);
});



export default productRouter;

