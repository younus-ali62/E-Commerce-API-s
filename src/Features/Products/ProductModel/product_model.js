import Users from "../../Users/UserModel/user_model.js";
import ApplicationError from "../../../Error_Handler/error_handler.js";
export default class Products {
  constructor(
    _id,
    _productName,
    _description,
    _category,
    _price,
    _sizes,
    _imageUrl
  ) {
    this._id = _id;
    this._productName = _productName;
    this._description = _description;
    this._category = _category;
    this._price = _price;
    this._sizes = _sizes;
    this._imageUrl = _imageUrl;
  }

  static getProducts() {
    return products;
  }
  static addNewProduct(newProduct, imageName) {
    const newproduct = new Products(
      products.length + 1,
      newProduct.name,
      newProduct.description,
      newProduct.category,
      parseFloat(newProduct.price),
      newProduct.size.split(","),
      imageName
    );
    const result = products.push(newproduct);
    return products;
  }

  static getOneProductModel(id) {
    const result = products.find((product) => id == product._id);
    return result;
  }

  static filterProductModel(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!parseFloat(minPrice) ||
          parseFloat(product._price) >= parseFloat(minPrice)) &&
        (!parseFloat(maxPrice) ||
          parseFloat(product._price) <= parseFloat(maxPrice)) &&
        (!category || category == product._category)
      );
    });
    return result;
  }

  static rateProduct(userId, productId, rating) {
    //check userId and productId is valid or not
    //userId validaion
    const userResult = Users.validUser(userId);
    if (!userResult) {
      // return ({success:"failure",msg:"User is not found"});
      throw new ApplicationError("User not found", 403);
    }

    //productId validation
    const productResult = products.find((product) => product._id == productId);
    if (!productResult) {
      throw new ApplicationError("Product not found", 403);
    }

    //now check there is rating array is present in product or not
    if (!productResult.rating) {
      productResult.rating = [];
      productResult.rating.push({ userId: userId, rating: rating });
    } else {
      //now check user rating is already available

      const existingRatingIndex = productResult.rating.findIndex(
        (r) => r.userId == userId
      );
      if (existingRatingIndex >= 0) {
        productResult.rating[existingRatingIndex] = {
          userId: userId,
          rating: rating,
        };
      } else {
        productResult.rating.push({ userId: userId, rating: rating });
      }
    }
  }
  static validProductId(id) {
    return products.find((product) => product._id == id);
  }
}

const products = [
  new Products(
    1,
    "Water Glass Tumbler",
    "Highball Glasses Clear Iced Tea and Glasses for Drinking Cocktail, Juice, Milkshake, Coke, Soda, Lassi, Dishwasher Safe Set of 6",
    "category1",
    497,
    ["S", "M", "L"],
    "https://m.media-amazon.com/images/I/61K5aYS5eNL._SY300_SX300_QL70_FMwebp_.jpg"
  ),

  new Products(
    2,
    "Ice Cream",
    "strawberry",
    "category2",
    20,
    [],
    "https://www.allrecipes.com/thmb/pH8hoFfytcOT9XVK1DSmxv3L0OU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140877-easy-eggless-strawberry-ice-cream-ddmfs-3x4-1-092e4d11b59049c8b3843014ea3c57f2.jpg"
  ),
  new Products(
    3,
    "Tumbler",
    "Highball Glasses Clear Iced Tea and Glasses for Drinking Cocktail, Juice, Milkshake, Coke, Soda, Lassi, Dishwasher Safe Set of 6",
    "category1",
    497,
    ["S", "M", "L"],
    "https://m.media-amazon.com/images/I/61K5aYS5eNL._SY300_SX300_QL70_FMwebp_.jpg"
  ),
];
