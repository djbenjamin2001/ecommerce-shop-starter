import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuppliers } from '../contexts/Suppliercontext';

const SupplierDetails = () => {
  const { id } = useParams();
  const { orders } = useSuppliers();
  const exchangeRate = 7; // Assuming a static exchange rate of 1 USD = 7 DKK

  const order = orders.find(o => o.id.toString() === id);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-xl font-bold text-center">Order not found</div>
      </div>
    );
  }

  let totalPriceInDKK;

  if (order.items && order.items.length > 1) {
    // Calculate total price of all items in DKK
    totalPriceInDKK = order.items.reduce((total, item) => {
      return total + (item.product_price * exchangeRate);
    }, 0).toFixed(2);
  } else {
    // Calculate price for single item order in DKK
    totalPriceInDKK = (order.product_price * exchangeRate).toFixed(2);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center my-6">Order Details</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Product Name: {order.product_name}
          <div className="grid grid-cols-1 gap-4">
            {order.items && order.items.map((item, index) => (
              <div key={index} className="border border-gray-300 rounded-md p-4">
                <div className="font-medium">{item.product_name}</div>
              </div>
            ))}
          </div>
          </h2>
          
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-700">Client Name:</label>
            <p>{order.client_name}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Order Date:</label>
            <p>{order.order_date}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Client Address:</label>
            <p>{order.client_address}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Product Price: </label>
            <p>DKK {totalPriceInDKK}</p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default SupplierDetails;
