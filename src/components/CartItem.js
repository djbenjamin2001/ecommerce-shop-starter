import React from 'react';
import { useCart } from './contexts/CartContext'; // Make sure the import path is correct

const CartItem = ({ item }) => {
    const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

    return (
        <div className="flex justify-between items-center my-2 p-2 border-b">
            <div>
                <h4>{item.title}</h4> 
                <div>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
            </div>
           
        </div>
    );
};

export default CartItem;
