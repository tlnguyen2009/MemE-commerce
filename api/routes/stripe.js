//StripeAPI docs: https://docs.stripe.com/api/payment_intents/object?api-version=2025-04-30.preview&rds=1

const router = require("express").Router();

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRI_KEY);

//Those {data} down here can be passed in as a req.body from front-end
router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Meme payment',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/pay',
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
