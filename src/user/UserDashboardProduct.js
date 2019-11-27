import React from "react";
import Layout from "../core/Layout";
import Info from "../core/LayoutDashboard";
import addProduct from "./AddProduct";
import styled from "styled-components";



const UserDashboard = () => {


    return (
        <ProductWrapper>
                 <Layout title="CategoryDashboard" description="User Add product Dah">
            <Info id="myTabContent" class="new-profile-work" >
                {addProduct()}
            </Info>

        </Layout>   
        </ProductWrapper>

    )
}

export default UserDashboard;
const ProductWrapper = styled.div`
  
  .troll{
    background: "BLACK";
    border-top: transparent;
    transition: all 1s linear;
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
