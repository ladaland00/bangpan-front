import React, { useState } from "react";
import { Button } from "reactstrap";
import ShowImage from "./ShowImage";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-dom";
import { addItem, removeItem } from "./apiCart";

const Card = ({
  product,
  showAddToCartButton = true,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const addToCart = () => {
    if (isAuthenticated()) {
      if (isAuthenticated().user._id===product.ownername){
        alert("กำลังซื้อสินค้าตัวเอง");
      }
      else{
        if (product.status == 0) {
        addItem(product, () => {
          setRedirect(true);
        });
        }
        if (product.status == 1) {
          alert("สินค้ามีการจอง");
        }
        if (product.status == 2) {
          alert("สินค้าไม่มีอยู่ในระบบ");
        }
        }
      
    }
    else {
      alert("กรุณาเข้าสู่ระบบ");
    }

    window.location.reload(false);

  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <Button onClick={addToCart} color="success"  >
          Add to cart
        </Button>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <div class="card"  >
      {shouldRedirect(redirect)}
      <div class="img-container p-5">
        <ShowImage item={product} url="products" />
      </div>
      <div className="card-footer d-flex justify-content-between">
        <p class="align-self-center mb-0">
          <h5 class="text-blue font-italic mb-0">
            {product.name}</h5>
        </p>
        <h5 class="text-blue font-italic mb-0">
          {product.status === 0 && (
            <span class="mr-1">ว่าง</span>
          )}
          {product.status === 1 && (
            <span class="mr-1">จอง</span>
          )}
          {product.status === 2 && (
            <span class="mr-1">ขายแล้ว</span>
          )}

        </h5>

      </div>
      <p className="black-8">
      </p>
      <Button color="info" href={`/product/${product._id}`}>Detail</Button>

      {showAddToCartBtn(showAddToCartButton)}

      {showRemoveButton(showRemoveProductButton)}

    </div>



  );
};

export default Card;

