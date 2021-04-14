const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createPaymentIntent = (amount) => {
  const feeRate = 0.0213;
  var fee = Math.ceil(amount * feeRate);
  return stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    // application_fee_amount: fee,
    // transfer_data: {
    //   destination: stripeAccountID,
    // },
  });
}

router.post('/', async (req, res) => {
  try {
    const amount = req.body.amount;
    const paymentIntent = await createPaymentIntent(amount);
    console.log(paymentIntent);
    res.status(200).send(paymentIntent.client_secret);
  } catch(err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}) 


module.exports = router;