import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";

const Home = () => {
  const { products, error, loading } = useProducts();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [exchangeRate, setExchangeRate] = useState(7); // Assuming 1 USD = 7 DKK

  // Fetch exchange rate from an API (example function, you will need an actual API)
  useEffect(() => {
    // Function to fetch currency exchange rate
    const fetchExchangeRate = async () => {
      // Use a real API to fetch the exchange rate
      // For now, we're setting it statically
      setExchangeRate(7);
    };

    fetchExchangeRate();
  }, []);

  // Extract unique categories from the product list
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  // Memoized product sorting and filtering
  const sortedFilteredProducts = useMemo(() => {
    const filtered = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;

    return filtered
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => (isAscending ? a.price - b.price : b.price - a.price));
  }, [products, selectedCategory, isAscending, searchTerm]);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    addItem(product);
  };

  const handleSortToggle = () => {
    setIsAscending(!isAscending);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex border-2 border-gray-300 rounded overflow-hidden mb-4">
        <input
          type="search"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 w-full"
        />
      </div>

      <div className="flex flex-wrap justify-between items-center mb-4">
        <button
          onClick={handleSortToggle}
          className="bg-emerald-600 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition-colors duration-300 ease-out"
        >
          Sort by Price {isAscending ? "Ascending" : "Descending"}
        </button>
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 m-2 rounded-lg text-sm font-medium ${
                selectedCategory === category
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-2 m-2 bg-gray-300 rounded-lg text-sm font-medium"
          >
            All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedFilteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-2xl"
          >
            <Link
              to={`/product/${product.id}`}
              className="flex-grow p-4 text-center"
            >
              <img
                src={product.image[0]}
                alt={product.title}
                className="mb-4 h-40 w-full object-cover"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-md font-semibold text-gray-900 mb-1">
                    {product.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-1">
                    {product.category}
                  </p>
                  <p className="text-lg text-gray-800 font-bold">
                    DKK {(product.price * exchangeRate).toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="mt-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-b-lg transition-colors duration-300 ease-in-out"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
