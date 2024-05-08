import React from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Sidebar = ({ exchangeRate = 7 }) => {
    const { isOpen, closeSidebar } = useSidebar();
    const { items, total, increaseQuantity, decreaseQuantity, removeItem } = useCart();

    // Convert total price from USD to DKK
    const totalInDKK = (total * exchangeRate).toFixed(2);

    // Handler to close sidebar and navigate
    const handleCheckout = () => {
        closeSidebar();
    };

    return (
        <article className={`fixed top-0 right-0 md:w-64 w-3/4 h-full bg-white shadow-lg transform pb-5 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
          <div>
            <h1 className="font-bold text-base">Cart Items</h1> 
            <button onClick={closeSidebar} className="text-red-600 p-2 absolute top-0 right-0 text-xs md:text-base">
                Close [X]
            </button>
            </div>
            <div className="p-2 overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 max-h-full">
               
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="flex flex-col justify-between items-start border-b py-2">
                            <div className="w-full">  
                            <img src={item.image} alt="" className="w-16 h-16 object-cover my-2" />
                                <span className="font-bold text-xs">{item.title}</span>
                              
                                <div className="text-xs mb-2">DKK {(item.price * exchangeRate).toFixed(2)} x {item.quantity}</div>
                            </div>
                            <div className="flex">
                                <button onClick={() => increaseQuantity(item.id)} className="px-1 py-1 bg-green-500 text-white rounded text-xs mr-1">
                                    +
                                </button>
                                <button onClick={() => decreaseQuantity(item.id)} className="px-1 py-1 bg-red-500 text-white rounded text-xs mr-1" disabled={item.quantity === 1}>
                                    -
                                </button>
                                <button onClick={() => removeItem(item.id)} className="px-1 py-1 bg-gray-500 text-white rounded text-xs">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-xs">Your cart is empty.</p>
                )}
                <div className="mt-2 text-lg font-bold">
                    Total: DKK {totalInDKK}
                </div>
                <Link to="/checkout" className="block text-center w-full py-1 bg-gray-500 text-white rounded text-xs my-2" onClick={handleCheckout}>Go to Checkout</Link>

            </div>
         

        </article>
    );
};

export default Sidebar;