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
router.get("/", async(req, res) => {
    const newProduct = req.query.new; // e.g. "?recent = true"            | 1st way to retrieve query
    const queryCategory = req.query.category; // e.g. ?catetogory = "crying"

    try{
        let allProducts;

        if(newProduct) { //show by recently
            allProducts = await Product.find().sort({createdAt: -1}).limit(1);
        } else if (queryCategory) {
            allProducts = await Product.find({
                categories: {
                    $in: [queryCategory]
                },
            });
        } else {
            allProducts = await Product.find();
        }
         
        res.status(200).json(allProducts);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router