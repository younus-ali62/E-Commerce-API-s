
import Products from "../ProductModel/product_model.js";
const products=Products.getProducts();
export default class ProductController{
   

    getAllProducts(req,res){
       
       res.status(200).send(products);
    }

    addProduct(req,res){
      
        const newProduct=req.body;
        const imageName=req.file.filename;
        const result=Products.addNewProduct(newProduct,imageName);
        res.status(200).send(products);

    }

    rateProduct(req,res){

    }

    getOneProduct(req,res){
        
    }
};

