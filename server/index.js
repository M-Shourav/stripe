import express from "express";
import Stripe from "stripe";
import "dotenv/config";
console.log("env", process.env.PORT);

const app = express();
const port = process.env.PORT || 8000;

const MY_DOMAIN = process.env.DOMAIN_URL;

const secret_Key =
  "sk_test_51PyWShAaZNCejfySqOk24DygACipMQ8aevKp3elPY1tO7d1flbTIBnkF8zbzaQN3gf6KGrZuOpndi9FrHBGCndB900JIP7pZsz";

app.post("/create-checkout-session", async (req, res) => {
  try {
    const stripe = new Stripe(process.env.SECRET_PUBLIC_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1PyxV9AaZNCejfySVaUn0FDg",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${MY_DOMAIN}?success=true`,
      cancel_url: `${MY_DOMAIN}?canceled=true`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
