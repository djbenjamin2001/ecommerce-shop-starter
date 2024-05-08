import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: "block", background: "gray", zIndex: 20 }}
      onClick={onClick}
    >
      {"<"}
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: "block", background: "gray", zIndex: 20 }}
      onClick={onClick}
    >
      {">"}
    </div>
  );
}

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addItem } = useCart();
  const [exchangeRate, setExchangeRate] = useState(7); // Defaulting to 1 USD = 7 DKK

  useEffect(() => {
    // Placeholder for exchange rate fetching
    // You might use an API call here to get the current exchange rate
    // setExchangeRate(fetchedRate);
  }, []);

  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem(product);
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        {product.image && product.image.length > 1 ? (
          <Slider {...settings}>
            {product.image.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Product View ${index + 1}`} className="w-full h-auto shadow-lg sm:w-3/4 sm:mx-auto" />
              </div>
            ))}
          </Slider>
        ) : (
          <img src={product.image[0]} alt={product.title} className="w-full h-auto shadow-lg sm:w-3/4 sm:mx-auto" />
        )}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-amber-900 sm:text-lg">{product.title}</h1>
          <p className="text-gray-700 sm:text-sm">{product.category}</p>
          <p className="text-gray-500 mt-2 sm:text-xs">{product.description}</p>
          <div className="mt-3 font-bold text-xl sm:text-lg">
            DKK {(product.price * exchangeRate).toFixed(2)}
          </div>
          <button onClick={handleAddToCart} className="mt-4 bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition duration-300 ease-in-out sm:px-4 sm:py-1 sm:text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
