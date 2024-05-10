import React from 'react';
import { Link } from 'react-router-dom';
import { MdPlayCircleOutline } from 'react-icons/md';  // For videos
import { FiShoppingCart } from 'react-icons/fi';       // For orders
import { AiOutlineUser } from 'react-icons/ai';        // For profile
import { BiStore } from 'react-icons/bi';              // For webshop

const Card = ({ title, description, link, icon }) => {
  const IconComponent = icon;  // Component to render the specific icon

  return (
    <div className="flex flex-col justify-center items-center p-12 w-full max-w-5xl min-h-[500px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
      <IconComponent className="text-6xl text-blue-700 mb-4" />
      <h5 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 text-center">{title}</h5>
      <p className="mb-6 font-normal text-gray-700 text-2xl text-center">{description}</p>
      <Link to={link} className="inline-flex items-center py-4 px-8 text-xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        Learn More
        <svg aria-hidden="true" className="ml-2 -mr-1 w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </Link>
    </div>
  );
};

export default Card;
