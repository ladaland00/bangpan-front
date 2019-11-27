import React from "react";
import Layout from "./Layout";
import ListProduct from "./ListProduct";


const Home = () => {
    return (
        <Layout title="Home Page" >
            <div class="container center">
                <ListProduct />
            </div>
        </Layout>
    )
}
export default Home;

