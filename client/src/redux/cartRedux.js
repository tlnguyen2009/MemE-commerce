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
        subtotal: 0,
    },
    
    reducers: {
        //For adding new products from Product.jsx page
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
            state.subtotal += action.payload.total;
        },

        //For updating product quantity inside Cart.jsx page
        updateQuantity: (state, action) => {
            const { _id, type } = action.payload;
            const product = state.products.find((p) => p._id === _id);

            if (!product) return; // return nothing -> Product not found in cart

            if (type === "inc") {
                product.thisProductQuantity += 1;
                product.thisProductTotal += product.price;
                state.quantity += 1;
                state.subtotal += product.price;
            }

            if (type === "dec") {
                if (product.thisProductQuantity > 1) { // Quantity is still greater than 1
                    product.thisProductQuantity -= 1;
                    product.thisProductTotal -= product.price;
                    state.quantity -= 1;
                    state.subtotal -= product.price;
                } else { // Quantity is from 1 to 0, and now we want to remove the product completely from products[]
                    const index = state.products.findIndex(p => p._id === _id); //Find index (Redux syntax) - Faster and safer than the traditional Javascript copy the whole array
                    if (index !== -1) {
                        state.products.splice(index, 1); //Slicing (Redux syntax) - Faster and safer than the traditional Javascript copy the whole array
                        state.quantity -= 1;
                        state.subtotal -= product.price;
                    }
                }
            }
        }
    }
})

export const {addProduct, updateQuantity} = cartSlice.actions; //name of the "action" passed in dispatch(...). Ex: dispatch(addProduct({...})). Look at Product.jsx for clearer image.
export default cartSlice.reducer;