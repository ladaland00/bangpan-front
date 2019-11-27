import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiUser";
import moment from "moment";
import Info from "../core/LayoutDashboard";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };
    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };
    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);
    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h4 className="display-4">
                    Total orders: {orders.length}
                </h4>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        console.log("update order status");
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };
    const showStatus = o => (
        <div className="form-group">
            <h5 className="mark mb-4">Status: {o.status}</h5>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
    return (
        <Layout title="Orders">
                        <Info id="Content" >

            <div className="row ">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((o, oIndex) => {
                        return (
                            <div className="row">
                               <div
                                className="mt-4"
                                key={oIndex}
                                style={{ borderBottom: "4px solid indigo" }}
                            >
                              
                                <ul className="list-group mb-2"> 

                                    <li className="list-group-item">   
                                <h4>
                                        Order ID: {o._id}
                                </h4>
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user && o.user.firstname} {o.user && o.user.lastname}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.phone}
                                    </li>
                                </ul>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {/* {JSON.stringify(o)} */}
                                        {showInput("Product name", p.name)}
                                        {showInput("Product Id", p._id)}
                                        {/*{showInput("Product ownername", p.ownername)}
                                        showInput("Product firstname", p.ownername.firstname)}
                                        {showInput("Product lastname", p.ownername.lastname)}
                                        {showInput("Product address", p.ownername.address)}
                                        {showInput("Product phone", p.ownername.phone)*/} 

                                    </div>
                                ))}
                            </div>
                       
                            </div>
                              );
                    })}
                </div>
            </div>
            </Info>
        </Layout>
    );
};

export default Orders;