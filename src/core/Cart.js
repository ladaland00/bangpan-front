import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./apiCart";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const showItems = items => {
    return (
      <div >
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}

      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Cart empty. <br /> <Link to="/">Continue shopping</Link>
    </h2>
  );

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  return (
    <Layout >
      <div className="row">
        <div className="col-3 mx-auto">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Your cart </h2>
          <hr />
          {/* {JSON.stringify(items)} */}
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
