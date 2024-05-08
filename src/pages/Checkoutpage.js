import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe } from '@stripe/react-stripe-js';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique identifiers

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51P90PjP9xhwOe23dOsvmdACAAVYY3S9IL9tMbrAxWvQQZgxkvFeUaTD37ZUT7D9RCbutuiL2mxVzFfOI2O2C2MuL00K1okPuFe');

const cardElementOptions = {
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
  hidePostalCode: true,
};

const CheckoutForm = ({ exchangeRate = 7 }) => {
  const { items, total } = useCart();
  const stripe = useStripe();
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe) {
      console.log("Stripe not initialized");
      return;
    }
    
    const order = {
      id: uuidv4(), // Unique ID for the entire order
      client_name: customerInfo.name,
      client_email: customerInfo.email,
      client_address: customerInfo.country + " address",
      order_date: new Date().toISOString().slice(0, 10),
      items: items.map(item => ({
        product_name: item.title,
        product_price: item.price * exchangeRate,
        quantity: item.quantity
      })),
    };

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order) // Send the entire order as a single object
      });

      if (response.ok) {
        console.log("Payment successful!");
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="email"
          name="email"
          onChange={handleInputChange}
          value={customerInfo.email}
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        <CardElement options={cardElementOptions} className="px-3 py-2 border border-gray-300 rounded-md"/>
        <input 
          type="text"
          name="name"
          onChange={handleInputChange}
          value={customerInfo.name}
          placeholder="Name on card"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        <input 
          type="text"
          name="country"
          onChange={handleInputChange}
          value={customerInfo.country}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        <div>
          <h3 className="text-lg font-medium">Order Summary</h3>
          <ul>
            {items.map(item => (
              <li key={item.id} className="flex justify-between py-1">
                <span>{item.title} x {item.quantity}</span>
                <span>DKK {(item.price * item.quantity * exchangeRate).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="text-lg font-bold py-2">Total: DKK {(total * exchangeRate).toFixed(2)}</div>
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
