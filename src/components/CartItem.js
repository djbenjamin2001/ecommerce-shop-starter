import React from 'react';
import { useCart } from './contexts/CartContext'; // Ensure this import path is correct

const CartItem = ({ item, exchangeRate = 7 }) => { // Default rate is set to 7 if not provided through props
    const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

    // Convert the item price from USD to DKK
    const priceInDKK = (item.price * exchangeRate).toFixed(2);

    return (
        <div className="flex justify-between items-center my-2 p-2 border-b">
            <div>
                <h4>{item.title}</h4> 
                <div>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
                <p>DKK {priceInDKK} x {item.quantity}</p> {/* Display price in DKK */}
            </div>
        </div>
    );
};

export default CartItem;
