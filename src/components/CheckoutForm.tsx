"use client";
import { Oval } from "react-loader-spinner";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { BASE_API_URL } from "@/utils/constants";

const CheckoutForm = ({ props }: { props: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const userSlice = useSelector((state: RootState) => state.userReducer);

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!BASE_API_URL) {
      return null;
    }

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    4;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${BASE_API_URL}/success`,
        receipt_email: userSlice.emailAdress,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-7 w-full justify-center items-center"
    >
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
        className="w-[50vh]"
      />

      <div className="flex  w-full justify-between items-center">
        <button
          type="submit"
          // disabled={props.isSubmitting}
          onClick={() => props.prevStep()}
          className="uppercase md:p-3 w-[40%] text-xs md:text-base p-2  text-white bg-fuchsia-400"
        >
          Previous
        </button>
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="uppercase md:p-3 p-2 w-[40%] text-xs md:text-base  text-white bg-red-400 "
        >
          <span id="button-text">
            {isLoading ? (
              <div className="flex gap-2 justify-center items-center">
                <Oval
                  visible={true}
                  height="20"
                  width="20"
                  color="#f3f6f4"
                  strokeWidth="8"
                  secondaryColor="#c0c0c0"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                Please wait...
              </div>
            ) : (
              "Confirm order"
            )}
          </span>
        </button>
      </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
