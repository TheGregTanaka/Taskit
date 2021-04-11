const express = require('express');
const CONNECTED_ACCOUNT_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(CONNECTED_ACCOUNT_SECRET_KEY);
const router = express.Router();

// Create account
const account = (email) => {
  return stripe.accounts.create({
    type: 'standard',
    email: email,
  });
}

// Payment intent - get fee
const paymentIntent = (amount, fee, stripeAccountID) => {
  return stripe.paymentIntents.create({
    payment_method_types: ['card'],
    amount: amount,
    currency: 'usd',
    application_fee_amount: fee,
    transfer_data: {
      destination: stripeAccountID,
    },
  });
}

// confirm payment intent
const paymentIntent_confirm = (paymentIntentID) => {
  return stripe.paymentIntents.confirm(
    paymentIntentID,
    {payment_method: 'pm_card_visa'}
  );
}

router.post('/', async (req, res) => {
  try {
    const email = req.body.card.email; 
    const feeRate = 0.0213;
    var amount = req.body.card.amount * 100;
    var fee = Math.ceil(amount * feeRate);
    
    var accountResponse = await account(email);
    var paymentIntentResponse = await paymentIntent(amount, fee, accountResponse.id);
    var paymentIntentConfirmResponse = await paymentIntent_confirm(paymentIntentResponse.id);
    console.log(paymentIntentConfirmResponse);

    // res.send("Charged!");
  } catch(e) {
    console.log(e);
    res.status(500);
  }
}) 


module.exports = router;