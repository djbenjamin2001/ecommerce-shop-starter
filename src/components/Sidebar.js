import React from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import { useCart } from '../contexts/CartContext';

const Sidebar = () => {
    const { isOpen, closeSidebar } = useSidebar();
    const { items, total, increaseQuantity, decreaseQuantity, removeItem } = useCart();

    return (
        <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
            <button onClick={closeSidebar} className="text-red-600 p-2 absolute top-0 right-0">
                Close [X]
            </button>
            <div className="p-4 overflow-y-auto">
                <h2 className="font-bold text-lg">Cart Items</h2>
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b py-2">
                            <div>
                                <span className="font-bold">{item.title}</span>
                                <div>${item.price.toFixed(2)} x {item.quantity}</div>
                            </div>
                            <div>
                                <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-green-500 text-white rounded">
                                    +
                                </button>
                                <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-red-500 text-white rounded" disabled={item.quantity === 1}>
                                    -
                                </button>
                                <button onClick={() => removeItem(item.id)} className="px-2 py-1 bg-gray-500 text-white rounded">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
                <div className="mt-4 text-lg font-bold">
                    Total: ${total.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
