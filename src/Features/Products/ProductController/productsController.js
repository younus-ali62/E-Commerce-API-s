
import Products from "../ProductModel/product_model.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
const products=Products.getProducts();
export default class ProductController{
   

    getAllProducts(req,res){
     
       res.status(200).send(products);
    }

    addProduct(req,res){
      
        const newProduct=req.body;
        const imageName=req.file.filename;
        const result=Products.addNewProduct(newProduct,imageName);
        res.status(201).send(result);

    }

    rateProduct(req,res){
    
         const {userId,productId,rating}=req.query1;
         Products.rateProduct(userId,productId,rating);
         return  res.status(201).send("Product rated successfully")
    }

    getOneProduct(req,res){
        console.log("inside getone product")
        const requiredId=req.query.id;
        // console.log(requiredId);
        // const requiredId=req.params.id;
        
        const result= Products.getOneProductModel(requiredId);
        if(result){
           return  res.status(200).send(result);

        }else {
            throw new ApplicationError("Product not found",404)
           
        }
    };

    getAllFilterProducts(req,res){
       
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
        const result=Products.filterProductModel(minPrice,maxPrice,category);
    
        res.status(200).send(result);
    }
};

