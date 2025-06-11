const router = require("express").Router();
const {verifyTokenAndUserID, verifyTokenAndAdmin} = require("./verifyToken");
const Product = require("../models/Product");

//CREATE new product as ADMIN
router.post("/", verifyTokenAndAdmin, async (req,res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err) {
        res.status(500).json(err);
    }
})

//UPDATE as Admin
router.put("/:id", verifyTokenAndAdmin, async (req, res) => { 
    //update user with anything new in body by calling "Product" model
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json(updateProduct);
    } catch(err) {
        res.status(500).json(err);
    }
})

//DELETE product as Admin
router.delete("/:id",verifyTokenAndAdmin, async(req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET products (everyone can see products)
router.get("/find/:id", async(req, res) => {
    try{
        //after verifyTokenAndAdmin, Admin can find normal user profiles
        const product = await Product.findById(req.params.id); //read (2) about params
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET all products
router.get("/find", async(req, res) => {
    const recentProduct = req.query.recent; // e.g. "?recent = true"            | 1st way to retrieve query
    const queryCategory = req.query.category; // e.g. ?catetogory = "crying"
    const {limit} = req.query; //"?limit= 10                                    | 2nd way to retrieve query
    
    const finalLimit = limit ? parseInt(limit) : 5; // check if litmit exist, otherwise, set default to 5. use button to set limit later

    try{
        let allProducts;

        if(recentProduct) { //show by recently
            allProducts = Product.find().sort({createdAt: -1});
        } else if (queryCategory) {
            allProducts = Product.find({
                categories: {
                    $in: [queryCategory]
                },
            });
        } else {
            allProducts = Product.find();
        }

        allProducts = allProducts.limit(finalLimit);
        
        const allProductsReturn = await allProducts; //put await at the end here to end "chained" query above 
        res.status(200).json(allProductsReturn);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router