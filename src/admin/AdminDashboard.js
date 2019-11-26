import React from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import Info from "../core/LayoutDashboard";

import "../css/Dashbroad.css";


const AdminDashboard = () => {
    const {
        user: { _id, username, firstname, lastname, email, address, phone, role }
    } = isAuthenticated();

    return (
        <Layout title="Dashboard" description="user Dashboard">
            <Info id="myTabContent" >
                <div class="row">
                    <div class="col-md-2">
                        <m>User Id</m>
                    </div>
                    <div class="col-md-8">
                        <p>{username}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <m>Name</m>
                    </div>
                    <div class="col-md-8">
                        <p>{firstname} {lastname}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <m>Email</m>
                    </div>
                    <div class="col-md-8">
                        <p> {email}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <m>Address</m>
                    </div>
                    <div class="col-md-8">
                        <p>{address}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <m>phone</m>
                    </div>
                    <div class="col-md-8">
                        <p>{phone}</p>
                    </div>
                </div>
            </Info>

        </Layout>
    )
}

export default AdminDashboard;