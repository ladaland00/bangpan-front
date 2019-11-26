import React from "react";
import Layout from "../core/Layout";
import Info from "../core/LayoutDashboard";
import addProduct from "./AddProduct";

import "../css/Dashbroad.css";


const UserDashboard = () => {


    return (
        <Layout title="CategoryDashboard" description="User Add product Dah">
            <Info id="myTabContent" class="new-profile-work" >
                {addProduct()}
            </Info>

        </Layout>
    )
}

export default UserDashboard;