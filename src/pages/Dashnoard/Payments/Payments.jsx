import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payments = () => {
  return (
    <div>
      <SectionTitle
        title="Payment"
        description="Please proceed to pay for your session."
        subtitle="Your payment is secure and encrypted."
      />


{/* payment form */}
      <div>
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
