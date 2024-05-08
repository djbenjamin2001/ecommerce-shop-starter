import React from "react";
import { useSidebar } from "../contexts/SidebarContext"; // Ensure the path to SidebarContext is correct
import { useCart } from "../contexts/CartContext"; // Ensure the path to CartContext is correct
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import wood from "./heimwoodlogo.avif";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { items } = useCart();

  // Calculate the total number of items in the cart
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-emerald-600 text-white p-4 flex justify-between items-center">
      <Link to="/">
        <img src={wood} className="w-[5rem]" alt="" />
      </Link>

      {/* Render the SearchBar component */}
<Link to="/supplierpage"> Suppliers</Link>
<Link to="/contracts"> Contracts</Link>
<Link to="/clientpage"> Clients</Link>
<Link to="/video"> video guide</Link>
      <button
        onClick={toggleSidebar}
        className="px-4 py-2  hover:bg-gray-700 transition-colors duration-300 relative"
      >
        <BsFillCartFill className=" text-[2rem]" id="menu" />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {totalItems}
        </span>
      </button>
    </header>
  );
};

export default Header;
