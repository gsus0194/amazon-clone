import React, { useState } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import shuffle from "lodash/shuffle";
import Toggle from "./Toggle";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LoopIcon from "@material-ui/icons/Loop";
import ShuffleIcon from "@material-ui/icons/Shuffle";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const [order, setOrder] = useState("asc");

  const toggleSort = () => {
    const sortAsc = (a, b) => a.price - b.price;
    const sortDesc = (a, b) => b.price - a.price;

    setOrder(order === "asc" ? "desc" : "asc");
    basket.sort(order === "asc" ? sortDesc : sortAsc);
  };

  const sortShuffle = () => {
    dispatch({
      type: "UPDATE_BASKET",
      new: shuffle(basket),
    });
  };

  const sortRotate = () => {
    const newBasket = basket.slice();
    newBasket.unshift(newBasket.pop());

    dispatch({
      type: "UPDATE_BASKET",
      new: newBasket,
    });
  };

  const renderButtons = () => {
    return (
      <div className="checkout__toggle">
        <Toggle
          clickHandler={toggleSort}
          text={order === "asc" ? "Ascending" : "Descending"}
          icon={order === "asc" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        />
        <Toggle
          clickHandler={sortShuffle}
          text="Shuffle"
          icon={<ShuffleIcon />}
        />
        <Toggle clickHandler={sortRotate} text="Rotate" icon={<LoopIcon />} />
      </div>
    );
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

          {basket.length > 0 ? renderButtons() : <div />}

          {basket.map((item, i) => (
            <CheckoutProduct
              key={i}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
