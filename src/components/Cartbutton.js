import React from 'react';
import { useCart } from '../contexts/CartContext'; // Adjust the import path as needed

const CartButton = () => {
    const { items } = useCart();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <button className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cart
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {itemCount}
            </span>
        </button>
    );
};

export default CartButton;
