import React, { useState, useEffect } from "react";
import { emptyCart } from "./apiCart";
import { isAuthenticated, authenticate } from "../auth";
import { Link } from "react-router-dom";
import { createOrder,SecreteRead } from "../user/apiUser";

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: '',
    });
    const handleChange = name => event => {
        const value = event.target.value;
        setData({ ...data, [name]: value });
    };

    const buy = () => {
        setData({ loading: true });
        const createOrderData = {
            products: products,
            address: data.address,
            phone: isAuthenticated().user.phone,
            
        };

        //create order
        createOrder(userId, token, createOrderData)
            .then(() => {
                emptyCart(() => {
                    setRun(!run);
                    console.log(
                        "Order success and empty cart"
                    );
                    setData({
                        loading: false,
                        success: true
                    });
                })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            });

        window.location.reload(false);

    }
    useEffect(() => {   
    }, []);
    const showCheckout = () => {

        return products.length > 0 ?
            (   
                <div>
                   <h5>ที่อยู่ในการจัดส่ง</h5>
                    ชื่อ {isAuthenticated() && isAuthenticated().user.firstname} นามสกุล {isAuthenticated() && isAuthenticated().user.lastname}
                    <br />
                    <input
                        onChange={handleChange("address")}
                        value={isAuthenticated() && isAuthenticated().user.address}
                        type="checkbox"
                        className="form-check-input"
                    />
                    Address: {isAuthenticated() && isAuthenticated().user.address}
                    <br/>
                    <br />
                    <br />
                    <Link to="/cart">
                        <button onClick={buy} className="btn btn-primary">checkout</button>
                    </Link>
                </div>) : (
                <div >

                </div>
            );
    };
    return (
        <div>
            {showCheckout()}
        </div>
    );
};

export default Checkout;