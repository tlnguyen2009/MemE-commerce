import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartRedux"

//to store the states of all slicer for checking state later wherever we need like in Cart.jsx for example
export default configureStore({
    reducer: {
        cart: cartReducer,
    }
});