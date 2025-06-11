const router = require("express").Router();
const {verifyWebToken, verifyTokenAndUserID, verifyTokenAndAdmin} = require("./verifyToken");
const Cart = require("../models/Cart");

//everyone can CREATE new cart
router.post("/", verifyWebToken, async (req,res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch(err) {
        res.status(500).json(err);
    }
})

//user UPDATE their "own" cart, not others' carts
router.put("/:id", verifyTokenAndUserID, async (req, res) => { 
    //update cart with anything new in body by calling "Cart" model
    try {
        const updateCart = await Cart.findByIdAndUpdate(
        req.params.id, 
        {
            $set: req.body
        }, 
        {new: true})

        res.status(200).json(updateCart);
    } catch(err) {
        res.status(500).json(err);
    }
})

//user DELETE their "own" cart, not others' carts
router.delete("/:id",verifyTokenAndUserID, async(req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET Carts (everyone can see Carts)
router.get("/find/:userID", verifyTokenAndUserID, async(req, res) => {
    try{
        //after verifyTokenAndAdmin, Admin can find normal user profiles
        const cart = await Cart.findOne({userID: req.params.userID}); //search condition: Find a document in the Cart collection where the userID field matches the value from req.params.userID
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
})

//only Admin can GET ALL Carts from all users
router.get("/", verifyTokenAndAdmin, async(req, res) =>{
    try{
        const allCarts = await Cart.find();
        res.status(200).json(allCarts);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router