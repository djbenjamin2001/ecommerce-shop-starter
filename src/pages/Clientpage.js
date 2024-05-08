import React, { useState, useEffect } from 'react';
import { useClient } from '../contexts/Clientcontext';
import { Link } from 'react-router-dom';

function ClientPage() {
  const { orders: contextOrders, loading, error, reloadOrders } = useClient();
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem('sortOrder') || 'newest';
  });
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem('filter') || 'All';
  });

  useEffect(() => {
    if (contextOrders.length > 0 && orders.length !== contextOrders.length) {
      setOrders(contextOrders);
    } else if (!loading && !error && contextOrders.length === 0) {
      reloadOrders();
    }
  }, [contextOrders, loading, error, reloadOrders, orders.length]);

  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
    localStorage.setItem('filter', filter);
  }, [sortOrder, filter]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      reloadOrders();
    }, 300000); // Polling every 5 minutes
    return () => clearInterval(intervalId);
  }, [reloadOrders]);

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, status: newStatus, shipmentDate: newStatus === 'Shipped' ? order.shipmentDate || new Date().toISOString().slice(0, 10) : order.shipmentDate } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleShipmentDateChange = (index, newDate) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, shipmentDate: newDate } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const toggleAndSortByDate = () => {
    const isCurrentlyNewest = sortOrder === 'newest';
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.order_date);
      const dateB = new Date(b.order_date);
      return isCurrentlyNewest ? dateB - dateA : dateA - dateB;
    });
    setOrders(sortedOrders);
    setSortOrder(isCurrentlyNewest ? 'oldest' : 'newest');
  };

  const handleAddressChange = (index, newAddress) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, address: newAddress } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    // Optionally update on server:
    // updateOrder(order.id, { address: newAddress });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped':
        return 'text-blue-500 bg-blue-100';
      case 'Delivered':
        return 'text-green-500 bg-green-100';
      case 'Cancelled':
        return 'text-red-500 bg-red-100';
      case 'Processing':
        return 'text-yellow-500 bg-yellow-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const renderOrder = (order, index) => (
    <div key={order.id} className="grid grid-cols-1 md:grid-cols-4 items-center p-4 m-2 bg-white shadow-md rounded-lg">
      <div className="md:col-span-1">
        <div className="flex flex-col items-center md:items-start">
          {order.items && Array.isArray(order.items) && order.items.map((item, itemIndex) => (
            <div key={itemIndex} className="bg-gray-100 p-2 rounded-lg border border-gray-300 my-1 w-full">
              <Link to={`/orders/${order.id}`}>
                <div className="font-medium text-gray-800 text-center md:text-left">{item.product_name}</div>
              </Link>
            </div>
          ))}
          <Link to={`/orders/${order.id}`}>
            <div className="font-medium text-center md:text-left">{order.product_name}</div>
          </Link>
        </div>
      </div>
      <div className="text-center font-medium md:col-span-1">{order.order_date}</div>
      <div className="text-right md:col-span-1">
        <select
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
          value={order.status}
          onChange={(e) => handleStatusChange(index, e.target.value)}
        >
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Shipped">Shipped</option>
          <option value="Processing">Processing</option>
        </select>
      </div>
      <input
        type="text"
        value={order.address || ''}
        onChange={(e) => handleAddressChange(index, e.target.value)}
        className="md:col-span-2 p-1 border rounded w-full"
        placeholder="Update Address"
      />
      {order.status === 'Shipped' && (
        <div className="md:col-span-1">
          <input
            type="date"
            value={order.shipmentDate}
            onChange={(e) => handleShipmentDateChange(index, e.target.value)}
            className="p-1 border rounded w-full"
          />
        </div>
      )}
    </div>
  );

  const filteredOrders = orders.filter((order) => filter === 'All' || order.status === filter);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Orders and Status</h1>
      <div className="flex justify-center flex-wrap space-x-2 mb-4">
        {['All', 'Shipped', 'Delivered', 'Cancelled', 'Processing'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`py-2 px-4 rounded ${filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {status}
          </button>
        ))}
      </div>
      <button
        onClick={toggleAndSortByDate}
        className="mb-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
      >
        Sort by Date ({sortOrder === 'newest' ? 'Oldest First' : 'Newest First'})
      </button>
      <div className="flex flex-col">
        {filteredOrders.map(renderOrder)}
      </div>
    </div>
  );
}

export default ClientPage;
