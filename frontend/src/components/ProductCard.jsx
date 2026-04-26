import React from 'react';
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Default values if data is missing
  const productId = product?._id || '';
  const title = product?.title || 'Unnamed Product';
  const slug = product?.slug || '#';
  const price = product?.price || 0;
  const discount = product?.discount || 0;
  const actualAmount = product?.actualAmount || price;
  const image = product?.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';
  const avgRating = product?.avgRating || 0;
  const totalReviews = product?.totalReviews || 0;

  // Navigate to product detail page
  const goToProductDetail = () => {
    navigate(`/products/${slug}`);
  };

  // Function to render stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-400" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(avgRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-300 dark:text-gray-600" />
      );
    }
    
    return stars;
  };

  return (
    <Card 
      className="max-w-sm w-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={goToProductDetail}
    >
      <div className="relative">
        <img 
          alt={title} 
          src={image} 
          className="w-full h-48 object-contain rounded-t-lg p-4" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {discount}% OFF
          </span>
        )}
      </div>
      
      <h5 className="text-xl font-semibold text-center text-gray-900 dark:text-white mt-3 px-2 truncate">
        {title}
      </h5>

      <div className="mb-5 mt-2.5 flex justify-center items-center">
        <div className="flex items-center gap-1">
          {renderStars()}
        </div>
        <span className="ml-3 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {avgRating.toFixed(1)}
        </span>
        {totalReviews > 0 && (
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
            ({totalReviews})
          </span>
        )}
      </div>

      <div className="flex items-center justify-between px-3 pb-4">
        <div className="flex flex-col">
          {discount > 0 ? (
            <>
              <span className="text-gray-400 line-through text-sm">
                Rs. {price.toLocaleString()}
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Rs. {actualAmount.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Rs. {price.toLocaleString()}
            </span>
          )}
        </div>
        
        <button
          onClick={goToProductDetail}
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          View Details
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;