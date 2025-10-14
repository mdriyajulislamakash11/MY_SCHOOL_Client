import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useParams } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [session, setSession] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  // ✅ Fetch session info
  useEffect(() => {
    axiosSecure
      .get(`/sessions/${id}`)
      .then((res) => setSession(res.data))
      .catch((err) => console.error("Error loading session:", err));
  }, [id, axiosSecure]);

  const amount = session ? session.amount : 0;

  // ✅ Create Payment Intent
  useEffect(() => {
    if (amount > 0) {
      // এখানে *100 করা হচ্ছে কারণ Stripe cents এ নেয়
      axiosSecure
        .post("/create-payment-intent", { amount: amount * 100 })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => setError("Failed to create payment intent"));
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    setError("");

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "anonymous@example.com",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.post("/payments", {
          sessionId: session._id,
          sessionTitle: session.title,
          userEmail: user?.email,
          amount: session.amount,
          transactionId: paymentIntent.id,
          date: new Date(),
        });
        console.log("✅ Payment record saved:", paymentIntent.id);
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your payment was processed and recorded successfully.",
          confirmButtonColor: "#4f46e5",
        });
      } catch (err) {
        console.error("❌ Failed to save payment record:", err);
        Swal.fire({
          icon: "warning",
          title: "Payment Saved Locally",
          text: "Payment succeeded but record saving failed!",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-6 bg-gray-100">
      <div className="bg-white shadow-2xl rounded-3xl p-10 md:w-[420px] w-[90%]">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          💳 Pay for {session?.title || "Session"}
        </h2>

        <p className="text-center text-gray-500 mb-4">
          Amount: <strong>${amount.toFixed(2)}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="border border-gray-300 rounded-lg p-4 mb-8">
            <CardElement />
          </div>
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Pay Now
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default CheckoutForm;
