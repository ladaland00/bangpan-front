import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import userDashboard from "./user/UserDashboard";
import adminDashboard from "./admin/AdminDashboard";
import createProduct from "./user/UserDashboardProduct";
import adminCategory from "./admin/AdminDashboardCategory";
import pageCategory from "./core/Category";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./user/Orders";
import Profile from "./user/Profile";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>

                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/profile/:userId" exact component={Profile}/>
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/user/dashboard" exact component={userDashboard} />
                <Route path="/admin/dashboard" exact component={adminDashboard} />
                <Route path="/create/category" exact component={adminCategory} />
                <Route path="/category" exact component={pageCategory} />
                <Route path="/create/product" exact component={createProduct} />
                <Route path="/user/orders" exact component={Orders} />


            </Switch>
        </BrowserRouter>
    );
};

export default Routes;