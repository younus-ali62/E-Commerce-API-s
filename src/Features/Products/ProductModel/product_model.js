
export default class Products{

    constructor(_id,_productName,_description,_category,_price, _sizes,  _imageUrl){
        this._id=_id;
        this._productName=_productName;
        this._description=_description;
        this._category=_category;
        this._price=_price;
        this._sizes=_sizes;
        this._imageUrl=_imageUrl;
    };

    static getProducts(){
        return products;
    }
    static addNewProduct(newProduct,imageName){

        const newproduct=new Products(
            products.length+1,
            newProduct.name,
            newProduct.description,
            newProduct.category,
            parseFloat(newProduct.price),
            newProduct.size.split(','),
            imageName
        );
        products.push(newproduct);
    }
}

const products=[
    new Products(
        1,
        "Water Glass Tumbler",
        "Highball Glasses Clear Iced Tea and Glasses for Drinking Cocktail, Juice, Milkshake, Coke, Soda, Lassi, Dishwasher Safe Set of 6",
        "Category1",
        497,
        ["S","M","L"],
        "https://m.media-amazon.com/images/I/61K5aYS5eNL._SY300_SX300_QL70_FMwebp_.jpg"
    )
];