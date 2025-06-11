//library or package
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

//config
dotenv.config();

//constant definition
const port = 5000; //define port number

//This allows all origins
app.use(cors());

//connect mongoose DB
mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(()=> {console.log("DB connection successful")})
    .catch((err)=>{console.log(err)});

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.use("/api/stripes", stripeRoute);

app.listen(process.env.PORT || port, ()=>{
    console.log("Back end is running");
});