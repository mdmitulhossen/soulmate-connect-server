const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createpaymentIntent = async (req, res) => {
    const price  = req.body;
    // const amount = parseInt(price * 100);
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 599,
          currency: "usd",
        });
        // console.log("paymentIntent====>",paymentIntent)
        res.status(200).send({client_secret:paymentIntent.client_secret});
      }catch (err) {
        console.log('hello error')
      }
  }


  module.exports = {
    createpaymentIntent
  }