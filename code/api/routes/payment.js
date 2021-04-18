const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ------------------ Create account ------------------
const account = (email) => {
  return stripe.accounts.create({
    type: 'standard',
    email: email,
  });
}

// ------------------ Get Payment Intent ------------------
const createPaymentIntent = (amount, stripeAccountID) => {
  const feeRate = 0.0213;
  var fee = Math.ceil(amount * feeRate);

  return stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    application_fee_amount: fee,
    transfer_data: {
      destination: stripeAccountID,
    },
  });
}


// ------------------ Post Request ------------------
router.post('/', async (req, res) => {
  try {
    const amount = req.body.amount;
    const email = req.body.worker.email;

    var workerAccount = await account(email);
    var workerAccountID = workerAccount.id;
    const paymentIntent = await createPaymentIntent(amount, workerAccountID);

    // const paymentIntent = await createPaymentIntent(amount);
    res.status(200).send(paymentIntent.client_secret);
  } catch(err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}) 


module.exports = router;
