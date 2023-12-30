"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { InitialState } from "@/redux/features/productsSlice";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const PayComponent = ({ props }: { props: any }) => {
  const [clientSecret, setClientSecret] = React.useState("");
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );
  const products = productsSlice.cart;

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    const makeReqest = async () => {
      try {
        const res = await fetch("api/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(products),
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeReqest();
  }, [products]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm props={props} />
        </Elements>
      )}
    </div>
  );
};

export default PayComponent;
