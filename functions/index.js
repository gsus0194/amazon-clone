const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HPyXeAdea1cGF7DYxgsSgwHYt4Hq37cGWc3J3TL5Qa0GO9fd91AKkus3OO4935C2Hyg8p52hRVacyl3q4JEZC7R004M7q4ZgK"
);

// API

// - App config
const app = express();

// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API route
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request Received BOOM for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/amz-clone194/us-central1/api
