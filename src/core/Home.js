import React from "react";
import Layout from "./Layout";
import ListProduct from "./ListProduct";
import "../css/Dashbroad.css";


const Home = () => {
    return (
        <Layout title="Home Page" >
            <div class="container">
                <ListProduct />
            </div>
        </Layout>
    )
}
export default Home;

