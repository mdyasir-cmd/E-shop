import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Category from "./admin/category";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";
import {Provider} from "react-redux";
import Subcategory from "./admin/subcategory";
import Product from "./admin/product";
import Home from "./home";
import Shop from "./shop";
import Login from "./login";
import Signup from "./signup";
import Cart from "./cart";
import Adminlog from "./admin/adminlog";
import Dashboard from "./admin/dashboard";
import UserOrder from "./UserOrder";
import Searchproduct from "./searchproduct";
import Email from "./email";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/subcategory" element={<Subcategory />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop/:cid" element={<Shop />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/adminlogin" element={<Adminlog />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/userorder" element={<UserOrder/>} />
          <Route exact path="/searchproduct" element={<Searchproduct/>} />
          <Route exact path="/email" element={<Email/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
