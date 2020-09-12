import React, { useState } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../reducer";
import { useHistory } from "react-router-dom";

const Subtotal = () => {
  const history = useHistory();
  const [{ basket }] = useStateValue();
  const [error, setError] = useState(false);

  const handleBasketItems = () => {
    if (basket.length > 0) {
      history.push("/payment");
    }

    setError(true);
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong> {value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>

            {error && (
              <small className="subtotal__error">
                <strong>Add some items to your basket!</strong>
              </small>
            )}
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={handleBasketItems}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
