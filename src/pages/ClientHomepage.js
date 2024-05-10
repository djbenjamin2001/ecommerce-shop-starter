import React from 'react';
import Card from '../components/Card';
import { MdPlayCircleOutline } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BiStore } from 'react-icons/bi';

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12 m-12">
      <Card
        title="Videos"
        description="Watch our latest video content."
        link="/video"
        icon={MdPlayCircleOutline}
      />
      <Card
        title="Orders"
        description="Manage your orders here."
        link="/orders"
        icon={FiShoppingCart}
      />
      <Card
        title="My Profile"
        description="View and update your profile."
        link="/profile"
        icon={AiOutlineUser}
      />
      <Card
        title="Webshop"
        description="Browse our products."
        link="/webshop"
        icon={BiStore}
      />
    </div>
  );
};

export default HomePage;
