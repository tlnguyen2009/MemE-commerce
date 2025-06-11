const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema (
    {
        userID: {type: String, require: true},
        products: [{
            productID: {type: String},
            quantity: {type: Number, default: 1},
        }],
        amount: {type: Number, require: true}, //total amount
        address: {type: Object, require: true}, //Stripe will return an Object so we can read each line to extract the address
        status: {type: String, default: "pending"}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);