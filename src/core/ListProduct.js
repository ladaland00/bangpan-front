import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { getProduct } from "./apiCore";
import Card from "./Card";
import "../css/Dashbroad.css";
import Search from "./Search";
import styled from "styled-components";


const ListProduct = () => {
  const [productByStatus, setProductByStatus] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const loadProductByStatus = () => {
    getProduct('status')
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProductByStatus(data);
        }
      });
  };
  const loadProductByArrival = () => {
    getProduct('createdAt')
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProductByArrival(data);
        }
      });
  };
  useEffect(() => {
    loadProductByArrival();
    loadProductByStatus();
  }, []);
  return (
    <div className="container">
      <Search />
      <div class="row">สินค้าจร้า</div>
      <div class="row">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab"
              data-toggle="tab" href="#home" role="tab"
              aria-controls="home" aria-selected="true">วัน</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="profile-tab"
              data-toggle="tab" href="#profile" role="tab"
              aria-controls="profile" aria-selected="false">สถานะ</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="row">

              {productByArrival.map((product, i) =>
                (
                  <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-4 my-3 ">
                    <Card key={i} product={product} />
                  </ProductWrapper>
                ))}
            </div>
          </div>
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="row">
              {productByStatus.map((product, i) =>
                (<ProductWrapper className="col-9 mx-auto col-md-6 col-lg-4 my-3 "><Card key={i} product={product} /></ProductWrapper>))}
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default withRouter(ListProduct);
const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
    width:auto;
    height:250px;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);

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
