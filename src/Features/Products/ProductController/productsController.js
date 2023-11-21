
import Products from "../ProductModel/product_model.js";
export default class ProductController{
   

    getAllProducts(req,res){
       const products=Products.getProducts();
       res.status(200).send(products);
    }

    addProduct(req,res){


    }

    rateProduct(req,res){

    }

    getOneProduct(req,res){
        
    }
};

