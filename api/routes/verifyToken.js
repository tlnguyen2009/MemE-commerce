/*
***This file for verifying the token when user request another request after succesfully login

1/ token will be structured as HEADERS - PAYLOAD - TOKEN #
    HEADERS: contains "Authorization: Bearer <token series>" -> need to remove "Bearer" to retrieve the token string

    PAYLOAD: will contain designed info that needs to be saved and "iat" and "exp"
        {
            "id": "123456",
            "isAdmin": true,
            "username": "Tien",
            "iat": 1714053132,
            "exp": 1714139532
        } 

    TOKEN #: will be the token number

(2) in the user.js, we use the path router.put("/:id"). Anything after the colon ":" can be retrieved by using "req.params"

*/

/*THIS FILE CONTAINS ALL FUNCTIONS RELATED TO VERIFICATION*/

const jwt = require('jsonwebtoken');
const fs = require('fs');

/* Verify token middleware function
- Verifies that a user is logged in and provides a valid token (Authentication only).
- Use this to protect a route and only allow logged-in users. But don’t care who the user is, just that they’re authenticated.*/
const verifyWebToken = (req, res, next) => {
    const authHeader = req.headers.authorization; //we name the bearer "authorization when testing"
    if(authHeader) {
        const token = authHeader.split(" ")[1]; // (1) Remove 'Bearer' From Authorization: Bear <token series>
        // console.log(token); //testing 

        const publicKey = fs.readFileSync('./public.key', 'utf8');
        
        //In server, "req" is received from client
        // decodedTokenInfo is the payload content encoded from jwt.sign(...) near the end of auth.js
        jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decodedTokenInfo) => { //if false -> err, otherwise, sucess-> give us a decode payload (named as decodedTokenInfo)
                                                                                // "decodedTokenInfo" here is payload like (1) or to make it simple, just care about {_id, isAdmin} from token before
            if (err) {
                return res.status(403).json("Token invalid!");
            }
            // console.log(req); // testing print out whole request
            
            req.user = decodedTokenInfo; // "req.user" means creating a new property named "user" on "req" to save decoded token info. We can use this "req.user" later
            next(); //pass to the whatever next function or http (get, post...) call it
        });
    } else {
        return res.status(401).json("You are not authenticated! hehehe");
    }
};

/*Checks if the user is either the account owner or an admin (Authentication + Ownership check).
  Using this to protect a route that belongs to a "specific" user, like editing their profile. */
const verifyTokenAndUserID = (req,res,next) =>{
    //verify web token first
    verifyWebToken(req,res,()=>{//then next function
        if(req.user.id === req.params.id & !req.user.isAdmin) { //"req.user" is a human readable info saved from jwt function above and read (2) for "params"
            // res.status(200).json("your new profile info is saved") //will be conflict with other HTTP sending -> uncomment to know
            next();
        } else {
            res.status(403).json("This is not you, please verify yourself first!!!");
        }
    }) 
};

/*Purpose is same as verifyTokenAndUserID*/
const verifyTokenAndAdmin = (req,res,next) =>{
    //verify web token
    verifyWebToken(req,res,()=>{//next function
        if(req.user.isAdmin) { //read (2)
            // res.status(200).json("your new profile info is saved") //will be conflict with other HTTP sending -> uncomment to know
            next();
        } else {
            res.status(403).json("cannot verify admin! Only admin can do this");
        }
    }) 
};

module.exports = {verifyWebToken, verifyTokenAndUserID, verifyTokenAndAdmin};