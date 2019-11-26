import React from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import "../css/Dashbroad.css";
import Info from "../core/LayoutDashboard";
import {Button} from "reactstrap";
const Dashboard = () => {
    const {
        user: { _id, username, firstname, lastname, email, address, phone, role }
    } = isAuthenticated();
    return (
        <Layout title="Dashboard" description="user Dashboard">
            <Info id="Content" >
            <Button   href={`/profile/${_id}`}>Edit profile</Button>             
                <div class="row">
                    <div class="col-md-2">
                        <m>Username</m>
                    </div>
                    <div class="col-md-8" >
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
                        <m>Phone</m>
                    </div>
                    <div class="col-md-8">
                        <p>{phone}</p>
                    </div>
                </div>
            </Info>
        </Layout>
    )
}

export default Dashboard;