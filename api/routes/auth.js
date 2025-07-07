/*
What I learn?
1/ Encrypt the password before saving to Database

2/ About what to save in payload of JWT?
- The payload should include ONLY the information you want to trust and use later without needing to ask the database again.


*/ 

const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const fs = require('fs');

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC_KEY).toString(), //encrypted password before saved to database
            
        }
    );
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); //201: successful added
    } catch (err) {
        res.status(500).json(err);
        // console.log(err) //testing
    }
})

//LOGIN
router.post("/login", async (req,res)=>{ //we need "username" and "password" for req from client

    try{
        //finding username in database 
        const foundUser = await User.findOne({username: req.body.username,}); //returned user object info from mongoose
        if(!foundUser)
            return res.status(401).json("Wrong username or password");

        //decrypt password in database
        const bytes = CryptoJS.AES.decrypt(foundUser.password, process.env.SEC_KEY);
        const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
        
        // console.log(req.body.password); HTTPS will encrypt the info that send over it

        //pwd not match
        if (decryptPassword !== req.body.password)
            return res.status(401).json("Wrong username or password");
        
        //if everything match (SUCCESSFULLY LOG-IN) -> send back a token for user
        const privateKey = fs.readFileSync('./private.key', 'utf8');        // Load private
        
        //grant a token (asynchronously using RSA) - to save data in "payload" in ecrypted form
        jwt.sign(
            {   //payload
                id: foundUser._id, //save _id of the tuple in MongooseDB
                isAdmin: foundUser.isAdmin,
            }, 
            privateKey, 
            { algorithm: 'RS256', expiresIn: "1d"},
            (err,token) => { //when gain the token
                if (err)
                    return res.status(500).json("cannot do jwt. Signing error!");
                
                //object destructuring => extract password and others => NOT send the password
                const {password, ...others} = foundUser.toObject(); //"toObject()" helps filtered out unrelated info, get rid of it to see
                res.status(200).json({"user": others, "token": token}); //then, just sending others (NOT including password) + token (already encrypted). 
                //====> in short, "user" will save info for only front-end display purpose and for userRedux later (such as username, email, isAdmin - basically everything in User schema excepting for password). Whereas the "token" save "_id" and "isAdmin" for later verifying.
                
                // console.log("JWT token created:", token); //testing
            });

    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router