import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';  // Ensure the path is correct

const Home = () => {
  const { products } = useProducts();
  const { addItem } = useCart();

  const handleAddToCart = (event, product) => {
    event.stopPropagation(); // Prevents the click from triggering the link navigation
    addItem(product); // Add to cart logic using Cart Context
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="border rounded shadow-sm p-4 flex flex-col items-center bg-amber-100 hover:bg-amber-200 transition duration-300 ease-in-out">
          <Link to={`/product/${product.id}`} className="w-full text-center">
            <img src={product.image} alt={product.title} className="max-h-40 w-full object-contain mb-4" />
            <h2 className="text-lg font-semibold text-amber-800">{product.title}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-gray-800 font-bold">${product.price.toFixed(2)}</p>
          </Link>
          <button onClick={(e) => handleAddToCart(e, product)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
