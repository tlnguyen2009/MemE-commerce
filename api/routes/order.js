const router = require("express").Router();
const {verifyWebToken, verifyTokenAndUserID, verifyTokenAndAdmin} = require("./verifyToken");
const Order = require("../models/Order");

//everyone can CREATE new Order (creating orders means "they checkout")
router.post("/", verifyWebToken, async (req,res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(err) {
        res.status(500).json(err);
    }
})

//Only admin can UPDATE order after the order is made through the system
router.put("/:id", verifyTokenAndAdmin, async (req, res) => { 
    //update Order with anything new in body by calling "Order" model
    try {
        const updateOrder = await Order.findByIdAndUpdate(
        req.params.id, 
        {
            $set: req.body
        }, 
        {new: true})

        res.status(200).json(updateOrder);
    } catch(err) {
        res.status(500).json(err);
    }
})

//Only admin can DELETE order (by _id in database) after the order is made through the system
router.delete("/:id",verifyTokenAndAdmin, async(req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    }
})

//Only admin can GET order (by userID) after the order is made through the system
router.get("/find/:userID", verifyTokenAndAdmin, async(req, res) => {
    try{
        //after verifyTokenAndAdmin, Admin can find all orders under that userID
        const Order = await Order.find({userID: req.params.userID}); //search condition: Find a document in the Order collection where the userID field matches the value from req.params.userID
        res.status(200).json(Order);
    } catch (err) {
        res.status(500).json(err);
    }
})

//only Admin can GET ALL Orders from all users
router.get("/", verifyTokenAndAdmin, async(req, res) =>{
    try {
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Only admin can GET monthly income (any month and any year)
// need to put specific month and year in the query 
// such as GET /monthlyincome?month=4&year=2025
// if user didn't put-in year or month, it will be default last month of this year
router.get("/monthlyincome", verifyTokenAndAdmin, async(req, res) =>{
    //Check if query params exist, otherwise default to last month
    const now = new Date();
    const defaultMonth = now.getMonth(); // 0–11, so this is actually last month
    const defaultYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear(); // If Jan, go to last year

    // If query is not empty, get month and year from query (as numbers)
    // Otherwise, assign defaultMonth and defaultYear 
    const year = req.query.year ? parseInt(req.query.year) : defaultYear;
    const month = req.query.month ? parseInt(req.query.month) : defaultMonth; // 1 = Jan, 12 = Dec

    //Validate input
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ error: "Invalid year or month" });
    }

    // Calculate start and end of the target month
    const firstDayOfTargetMonth = new Date(year, month - 1, 1); // month - 1 since JS months are 0-based
    const firstDayOfNextMonth = new Date(year, month, 1);

    try {
        const monthlyincome = await Order.aggregate([
            { //stage 1: WHERE
                $match: {
                    createdAt: {
                        $gte: firstDayOfTargetMonth,
                        $lt: firstDayOfNextMonth
                    }
                }
            },
            { //stage 2: GROUP BY
                $group: {
                    _id: null, //no need to group by anything
                    totalIncome: {$sum: "$amount"}
                }
            },
        ]);

        res.status(200).json(monthlyincome)
        // const total = income[0]?.totalIncome || 0; //extract income
        // console.log("Last month's income:", total);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router