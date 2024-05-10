import React from "react";
import { useSidebar } from "../contexts/SidebarContext";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import wood from "./heimwoodlogo.avif";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-emerald-600 text-white p-4 flex justify-between items-center flex-wrap">
      <Link to="/" className="shrink-0">
        <img src={wood} className="w-16 h-16 md:w-20 md:h-20" alt="Logo" />
      </Link>

      <div className="flex gap-2 flex-grow justify-center">
        <Link to="/supplierpage" className="text-sm sm:text-base">Suppliers</Link>
        <Link to="/contracts" className="text-sm sm:text-base">Contracts</Link>
        <Link to="/clientpage" className="text-sm sm:text-base">Clients</Link>
        <Link to="/video" className="text-sm sm:text-base">Video Guide</Link>
      </div>

      <button
        onClick={toggleSidebar}
        className="px-3 py-2 hover:bg-gray-700 transition-colors duration-300 relative"
      >
        <BsFillCartFill className="text-3xl" />
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {totalItems}
        </span>
      </button>
    </header>
  );
};

export default Header;
