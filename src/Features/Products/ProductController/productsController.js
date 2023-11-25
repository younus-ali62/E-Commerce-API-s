
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
        res.status(201).send(result);

    }

    rateProduct(req,res){
    
       const {userId,productId,rating}=req.query;
       const error=Products.rateProduct(userId,productId,rating);
       if(error){
        return res.status(404).send(error);
       }else {
        return res.status(200).send("Rating has been added");
       }
    }

    getOneProduct(req,res){
        const requiredId=req.query.id;
        const result= Products.getOneProductModel(requiredId);
        if(result){
            res.status(200).send(result);

        }else {
            res.status(404).send("Product with this id not found");
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

