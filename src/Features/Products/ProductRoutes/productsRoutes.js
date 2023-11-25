import express from "express";
import ProductController from "../ProductController/productsController.js";
import { fileUpload} from "../../../Middlewares/fileUploadMiddleware.js";
const productController=new ProductController();
const productRouter= express.Router();


//already gone through localhost:3000/api/products

productRouter.get("/",productController.getAllProducts);
productRouter.get("/id",productController.getOneProduct);
productRouter.post("/",fileUpload.single("imgUrl"),productController.addProduct);
productRouter.get("/filterProducts",productController.getAllFilterProducts);
productRouter.post("/rate",productController.rateProduct);
export default productRouter;

