/*
Notice:
(1) When testing with headers, don't forget this form
   -> Authorization: Bearer <token>
   -> For example, Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

In JWT authentication, the Authorization header must start with the word "Bearer ", then the token.

(2) For the link path, use single "/" like "/find", don't use "/find/all"

(3) if we put "await" for a query, it will be executive and return. If we want a chained query, we have to put "await" at the end.

*/

/* THIS FILE CAN ONLY BE ACCESSED AFTER LOG-IN SUCCESSFULLY*/

const router = require("express").Router();
const {verifyTokenAndUserID, verifyTokenAndAdmin} = require("./verifyToken");
const User = require("../models/User");

// //Verify token and the user just wants to read their profile for example
// router.get("/profile", verifyWebToken, (req, res) => {
//     console.log(req.user); //testing -> should print out: id, isAdmin, iat, exp
    
//     res.status(200).json({
//         message: "You are authorized! Go view your profile!",
//         user: req.user
//     });
// });

//verify token and check id because user wants to UPDATE their profile (PUT).
//"/:id" anything after colon ":" will be saved in "req" and at "params" specifically (req.params)
//UPDATE
router.put("/:id", verifyTokenAndUserID, async (req, res) => { 
    //check if user changes their password ("req" will be "fresh" for every new request)
    if (req.body.password) { 
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SEC_KEY).toString(); // save it back to body.password to retrieve for update later in database
    }

    //update user with new password or anything new in body by calling "User" model
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json(updateUser);
    } catch(err) {
        res.status(500).json(err);
    }
})

//DELETE profile
router.delete("/:id",verifyTokenAndUserID, async(req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User profile has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET normal user profile as ADMIN
router.get("/find/:id",verifyTokenAndAdmin, async(req, res) => {
    try{
        //after verifyTokenAndAdmin, Admin can find normal user profiles
        const normalUser = await User.findById(req.params.id); //read (2) about params
        res.status(200).json(normalUser);
    } catch (err) {
        res.status(500).json(err)
    }
})

////GET ALL users' profile as ADMIN
router.get("/find",verifyTokenAndAdmin, async(req, res) => {
    const newPeopleQuery = req.query.newPeople; // = "true" because we set "?newPeople = true" | 1st way to retrieve query
    const {limit} = req.query; // = "N" where N is integer because we set "limit = 2" for example | 2nd way to retrieve query
    
    finalLimit = limit ? parseInt(limit) : 1;//check if there is limit in query
    
    //after verifyTokenAndAdmin, Admin can find ALL users' profile
    try{
        let allUsers = User.find(); //find all users
        if(newPeopleQuery) {
            allUsers = allUsers.sort({_id: -1});
        }

        allUsers = allUsers.limit(finalLimit);
        
        const allUsersReturn = await allUsers; //put await at the end here to end chained query above (3)
        
        res.status(200).json(allUsersReturn);

    } catch (err) {
        res.status(500).json(err)
    }
})

//GET user's stats as ADMIN
router.get("/stats",verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            // Stage 1: Filter users by creation date - last year to be specific. Equivalent to SQL: WHERE createdAt >= lastYear
            {
                $match: { createdAt: {$gte: lastYear} }
            },
            //Stage 2: create a new temp field for reference later
            {
                $project: { month: {$month: "$createdAt"}}, //extract the month using $month
            },
            //Stage 3:
            {
                $group: {
                    _id: "$month", //Group by the value stored in the month field from the previous stage. (this is also _id of a tuple)
                    total: {$sum: 1}, //like COUNT in sql
                }
            }
        ]);

        res.status(200).json(data);
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;