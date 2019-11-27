import React from "react";
import Layout from "../core/Layout";
import Info from "../core/LayoutDashboard";
import addCategory from "./AddCategory";



const AdminDashboard = () => {

    return (
        <Layout title="CategoryDashboard" description="Category admin Dashboard">
            <Info id="myTabContent" >
                {addCategory()}
            </Info>

        </Layout>
    )
}

export default AdminDashboard;