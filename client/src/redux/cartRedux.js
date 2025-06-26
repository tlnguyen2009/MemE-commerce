/*
    (1) The structure of one product info + quantity + total in products[] when push() a new product
        
        {
        _id: "123",                       \
        title: "Funny Meme Shirt",         |  ...action.payload.product,
        img: "shirt.png",                  |
        price: 20,                        /
        thisProductQuantity: 2,           |   thisProductQuantity: action.payload.quantity,
        thisProductTotal: 40  // 20 × 2   |   thisProductTotal: action.payload.product.price * action.payload.quantity
        }

*/ 

import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products:[], //this will save basic product info (title, img, price,...) + "quantity" for a specific product + "subtotal" for a specific product
        quantity: 0,
        grandTotal: 0,
    },
    reducers: {
        addProduct: (state, action) => { //user hits "add cart" button, will activate dispatch() as action to call this reducer
            // Finding if product is already exist in the products[] array
            const existingProduct = state.products.find( 
                (p) => p._id === action.payload.product._id
              );

            if (existingProduct) { //if exist, just update quantity and subtotal for that specific product
            existingProduct.thisProductQuantity += action.payload.quantity;
            existingProduct.thisProductTotal += action.payload.product.price * action.payload.quantity;
            } else {
            state.products.push({ //otherwise add new product info + quantity + subtotal into the array. Looking at (1)
                ...action.payload.product,
                thisProductQuantity: action.payload.quantity,
                thisProductTotal: action.payload.product.price * action.payload.quantity
            });
            }
            
            state.quantity += action.payload.quantity;
            state.grandTotal += action.payload.total;
        }
    }
})

export const {addProduct} = cartSlice.actions; //name of the "action" passed in dispatch(...). Ex: dispatch(addProduct({...})). Look at Product.jsx for clearer image.
export default cartSlice.reducer;