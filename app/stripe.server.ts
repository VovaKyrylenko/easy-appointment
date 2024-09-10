import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createPaymentIntent = async (amount: number) => {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: "usd",
  });
};
