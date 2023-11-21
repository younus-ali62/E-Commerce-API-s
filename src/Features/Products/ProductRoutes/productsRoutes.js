import express from "express";
import ProductController from "../ProductController/productsController.js";
import { fileUpload} from "../../../Middlewares/fileUploadMiddleware.js";
const productController=new ProductController();
const productRouter= express.Router();

//already gone through localhost:3000/api/products
productRouter.get("/",productController.getAllProducts);
productRouter.post("/",fileUpload.single("imgUrl"),productController.addProduct);

export default productRouter;

