import React from 'react';
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const ProductCard = ({ productId, productUrl, productName, productPrice, productRating }) => {
  return (
    <Card className="max-w-sm w-full shadow-lg transition-transform transform hover:scale-105">
      <NavLink to={`/product-detail/${productId}`}>
        <img 
          alt={productName} 
          src={productUrl} 
          className="w-full h-48 object-contain rounded-lg" 
        />
        <h5 className="text-xl font-semibold text-center text-gray-900 dark:text-white mt-3 truncate">
          {productName}
        </h5>
      </NavLink>
      <div className="mb-5 mt-2.5 flex justify-center items-center">
        {[...Array(Math.round(productRating))].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-300" />
        ))}
        <span className="ml-3 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {productRating}
        </span>
      </div>
      <div className="flex items-center justify-between px-3">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{productPrice}</span>
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
      </div>
    </Card>
  );
};

export default ProductCard;
