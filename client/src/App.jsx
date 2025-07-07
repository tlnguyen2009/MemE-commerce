/*
1/ I messed up with "products" and "product" in the path and it takes me the whole afternoon to figure out
*/

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {useSelector} from "react-redux"

const App = () => {
  const user = useSelector(state=>state.user.currentUser) //if user exists and successful log-in
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="products/:category" element={<ProductList/>} />
        <Route path="product/:id" element={<Product/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        {/* only show if user is not logged-in yet, otherwise, navigate to "/" home */}
        <Route path="login" element={user ? <Navigate to = "/"/> : <Login/>} />
        <Route path="register" element={user ? <Navigate to = "/"/> : <Register/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;