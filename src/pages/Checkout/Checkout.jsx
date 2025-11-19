import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe"); // default stripe

  const stripe = useStripe();
  const elements = useElements();

  // =============================
  // LOAD CART DATA
  // =============================
  const {
    data: cartdata = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartdata", user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/cart?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  // Calculate total
  const grandTotal = cartdata.reduce(
    (total, item) => total + item.perUnitPrice * item.quantity,
    0
  );

  // =============================
  // STRIPE PAYMENT INTENT
  // =============================
  useEffect(() => {
    if (grandTotal > 0 && paymentMethod === "stripe") {
      createPaymentIntent();
    }
  }, [grandTotal, paymentMethod]);

  const createPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        totalAmount: grandTotal,
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  // =============================
  // CLEAR CART FUNCTION
  // =============================
  const clearCart = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart?email=${user?.email}`
      );
      await refetch();
    } catch (err) {
      console.log("Failed to clear cart:", err);
    }
  };

  // =============================
  // HANDLE STRIPE PAYMENT
  // =============================
  const handleStripePayment = async () => {
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      }
    );

    if (error) {
      console.log("Stripe error:", error);
      return null;
    }

    return paymentIntent;
  };

  // =============================
  // HANDLE ORDER CREATION (common for all methods)
  // =============================
  const createOrder = async (transactionId = "COD") => {
    await axiosSecure.post("/order", {
      cartdata,
      customerInfo: { name: user?.displayName, email: user?.email },
      transactionId,
      totalPrice: grandTotal,
      date: new Date().toISOString(),
      paymentMethod,
    });

    await clearCart();
    navigate("/invoice");
  };

  // =============================
  // MAIN SUBMIT HANDLER
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // ---- CASE 1: STRIPE ----
    if (paymentMethod === "stripe") {
      const paymentIntent = await handleStripePayment();
      if (paymentIntent?.status === "succeeded") {
        await createOrder(paymentIntent.id);
      }
    }

    // ---- CASE 2: CASH ON DELIVERY ----
    if (paymentMethod === "cod") {
      await createOrder("COD-PAYMENT");
    }

    // ---- CASE 3: BKASH ----
    if (paymentMethod === "bkash") {
      // এখানে আপনার bKash API দিলে পুরো ফ্লো সেটআপ করে দিব
      alert("bKash integration আসছে... Backend API দিন।");
      setProcessing(false);
      return;
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md mt-10 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* Total */}
      <div className="border p-4 rounded mb-4">
        <p className="text-lg font-semibold">Grand Total: ${grandTotal}</p>
      </div>

      {/* Payment Method Selector */}
      <div className="mb-4">
        <label className="font-semibold mb-1 block">Select Payment Method:</label>

        <select
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
          className="p-2 border rounded w-full"
        >
          <option value="stripe">Stripe (Card Payment)</option>
          <option value="cod">Cash on Delivery</option>
          {/* <option value="bkash">bKash</option> */}
        </select>
      </div>

      {/* Show CardElement only for stripe */}
      {paymentMethod === "stripe" && (
        <div className="mb-4 p-3 border rounded">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                },
              },
            }}
          />
        </div>
      )}

      {paymentMethod === "bkash" && (
        <div className="p-3 border rounded text-sm text-gray-600">
          <p>➡ এখানে bKash Payment Gateway কাজ করবে।</p>
          <p>আপনার backend API পেলে আমি পুরো Integration সম্পূর্ণ করে দিব।</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={processing}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-3"
      >
        {processing ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
};

export default Checkout;
