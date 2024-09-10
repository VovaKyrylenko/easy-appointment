import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "~/components/checkout/checkout-form";
import { destroyDataSession, getDataSession } from "~/services/booking.session.server";
import { createPaymentIntent } from "~/stripe.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getDataSession(request.headers.get("Cookie"));
  const apartment = session.get("apartment");
  const dates = session.get("date");
  const userData = session.get("userData");
  const totalAmount = session.get("totalAmount");

  if (!totalAmount) {
    throw new Error("Total amount is missing");
  }

  const { client_secret } = await createPaymentIntent(Number(totalAmount));

  return json({
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    apartment,
    dates,
    userData,
    totalAmount,
    clientSecret: client_secret,
  });
};

export default function Pay() {
  const { publicKey, clientSecret, apartment, dates, userData, totalAmount } =
    useLoaderData<typeof loader>();

  return (
    <Elements stripe={loadStripe(publicKey)} options={{ clientSecret }}>
      <CheckoutForm
        apartment={apartment}
        dates={dates}
        userData={userData}
        totalAmount={totalAmount}
      />
    </Elements>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getDataSession(request.headers.get("Cookie"));

  if (session) {
    return redirect("/app/success", {
      headers: { "Set-Cookie": await destroyDataSession(session) },
    });
  }
};