import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; //redux persist basically just use localStorage in browser to store the JWT token (it can be easily exposed to XSS attack)
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//it will save in localStorage (F12 -> Application -> local storage) with the key-value (persis: "root") as the name we named above key:"root", it store the {user, token} we had in auth.js
// will help keep user log-in and cart info the same, even though refresh page, exit or anything make UI change.
const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

//to store the states of all slicer for checking state later wherever we need like in Cart.jsx for example
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);