import React, { forwardRef } from "react";
import "./Checkout.css";
import Subtotal from "../subtotal/Subtotal";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
import { useStateValue } from "../../StateProvider";

import FlipMove from "react-flip-move";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const FunctionalCheckout = forwardRef((props, ref) => (
    <div ref={ref}>
      <CheckoutProduct
        id={props.id}
        title={props.title}
        image={props.image}
        price={props.price}
        rating={props.rating}
      />
    </div>
  ));

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {!user ? "Guest" : user.email.split("@")[0]}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

          {/* {basket.map((item, i) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))} */}

          <FlipMove staggerDurationBy="30" duration={500} leaveAnimation="fade">
            {basket.map((item, i) => (
              <FunctionalCheckout key={i} {...item} />
            ))}
          </FlipMove>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
