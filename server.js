
const express = require("express");
const app = express();
const { resolve } = require("path");
const PORT = 49404;
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51R8wmeQ0DPGsMRTSaVuFrBQbwQwUGQVRngPfIcwub5OVc9zxuCld1PbIPvfxnK8ZdoWFkVZFDyagwsE7dwRSxTgB00WA4myndt");
app.use(express.static("."));
app.use(express.json());
const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    console.log(items[0].amount)
    return items[0].amount;
};
app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    const { currency } = req.body;
    console.log(currency)

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: currency
    });
    console.log(paymentIntent.client_secret);
    return res.send({
        clientSecret: paymentIntent.client_secret
    });
});
app.get('/greet', (req, res) => {
    res.send("It is working fine")
})
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));