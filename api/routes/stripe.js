//StripeAPI docs: https://docs.stripe.com/api/payment_intents/object?api-version=2025-04-30.preview&rds=1

const router = require("express").Router();

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRI_KEY);

//Those {data} down here can be passed in as a req.body from front-end
router.post('/create-checkout-session', async (req, res) => {
  try {
    // console.log(req.body.products);

    //want to create session for each product so we can see each product on the receipt
    const line_items = req.body.products.map((eachProduct) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: eachProduct.title,
        },
        unit_amount: Math.round(eachProduct.price * 100),
      },
      quantity: eachProduct.thisProductQuantity,  
    }));

    const session = await stripe.checkout.sessions.create({ 
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      // automatic_tax: { enabled: true },
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
