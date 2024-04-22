import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext'; // Ensure path accuracy
import { useCart } from '../contexts/CartContext'; // Make sure the import path is correct

const ProductDetails = () => {
  const { id } = useParams(); 
  const { products } = useProducts();
  const { addItem } = useCart();

  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem(product); // Add product to cart

    // Scroll to the menu or cart
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <img src={product.image} alt={product.title} className="w-full h-auto shadow-lg" />
        <div className="mt-4">
          <h1 className="text-xl font-bold text-amber-900">{product.title}</h1>
          <p className="text-gray-700">{product.category}</p>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <div className="mt-3 font-bold text-xl">${product.price.toFixed(2)}</div>
          <button onClick={handleAddToCart} className="mt-4 bg-amber-700 text-white px-6 py-2 rounded hover:bg-amber-800 transition duration-300 ease-in-out">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
