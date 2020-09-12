import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./components/payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/orders/Orders";

const promise = loadStripe(
  "pk_test_51HPyXeAdea1cGF7DUwJ1cbRLIjdKfinLKvdF5f5zUhgdLXUTBJj1SBOXCQUZ3nw9A8Uk1dCdwvVcS0L8rJGkPrhd00opIwgndh"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
