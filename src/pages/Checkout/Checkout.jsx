import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
const Checkout = () => {
    const {user} = useAuth();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    
    const {data: cartdata = [], isLoading, refetch } = useQuery({
        queryKey: ['cartdata', user?.email],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/cart?email=${user?.email}`)
          return data
        },
        enabled: !!user?.email,
      })
      
      const grandTotal = cartdata.reduce((total, item) => total + item.perUnitPrice
      , 0);
      

      useEffect(() => { 
            getPaymentIntent();
    }, [grandTotal]); 

      console.log(clientSecret)


      const getPaymentIntent = async () => {
        try {
            const { data } = await axiosSecure.post('/create-payment-intent', {
                totalAmount: grandTotal // Ensure grandTotal is a number
                // paymentMethodId // Make sure to send the paymentMethodId
            });
            setClientSecret(data.clientSecret); // Set client secret to state
        } catch (err) {
            console.log(err);
        }
    };
    
      const stripe = useStripe()
      const elements = useElements()
    //   console.log(stripe, "emalent", elements)
    
      const handleSubmit = async event => {
        setProcessing(true)
        // Block native form submission.
        event.preventDefault()
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement)
    
        if (card == null) {
          setProcessing(false)
          return
        }
    
        // // Use your card Element with other Stripe.js APIs
        // const { paymentMethod, error } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardElement),
        //   });
          
        //   if (error) {
        //       console.error(error);
        //   } else {
        //       setPaymentMethodId(paymentMethod.id); // Set paymentMethodId to send to backend
        //   }
        // confirm payment
       
        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            },
        });
        console.log(paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            try {
                // Create order for each item in the cart
            
                    await axiosSecure.post('/order', {
                    cartdata,
                    customerInfo: { name: user?.displayName, email: user?.email },
                        transactionId: paymentIntent.id,
                        totalPrice: grandTotal,
                        // quantity: item.quantity,
                        date: new Date().toISOString(),
                    });
                

                // Clear the cart after successful payment
                // await axiosSecure.delete(`/cart?email=${user?.email}`);

                refetch();
                navigate('/invoice');
            } catch (err) {
                console.log(err);
            } finally {
                setProcessing(false);
            }
        } else {
            setProcessing(false);
        }
    };

    return (
        <div>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Checkout</h2>
                <div className="border p-4 rounded bg-gray-50">
                    <p className="text-lg font-semibold">Grand Total: ${grandTotal}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="flex justify-around mt-2 gap-2">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        disabled={!stripe || !clientSecret || processing}
                        type="submit"
                    >
                        {processing ? "Processing..." : "Pay"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;