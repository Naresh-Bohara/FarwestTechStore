import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCartPlus,
} from "react-icons/fa";

const ProductCard = ({ product }) => {
  const title = product?.title || "Unnamed Product";
  const slug = product?.slug || "#";
  const price = product?.price || 0;
  const discount = product?.discount || 0;
  const actualAmount = product?.actualAmount || price;
  const image =
    product?.images?.[0] ||
    "https://placehold.co/600x400?text=No+Image";

  const avgRating = product?.avgRating || 0;
  const totalReviews = product?.totalReviews || 0;

  // format price
  const formatPrice = (amount) =>
    `Rs. ${(amount / 100).toLocaleString()}`;

  // ⭐ rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i)
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5)
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-700 group overflow-hidden">

      {/* IMAGE */}
      <NavLink to={`/products/${slug}`} className="block relative">
        <div className="h-52 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
          <img
            src={image}
            alt={title}
            className="h-full object-contain p-4 group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* DISCOUNT */}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
            {discount}% OFF
          </span>
        )}
      </NavLink>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">

        {/* TITLE */}
        <NavLink
          to={`/products/${slug}`}
          className="font-semibold text-gray-800 dark:text-white truncate hover:text-teal-600"
        >
          {title}
        </NavLink>

        {/* RATING */}
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(avgRating)}</div>
          <span className="text-xs text-gray-500">
            {avgRating.toFixed(1)} ({totalReviews})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-1">
          {discount > 0 ? (
            <>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(actualAmount)}
              </span>
              <span className="text-sm line-through text-gray-400">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <NavLink
          to={`/products/${slug}`}
          className="mt-3 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2 rounded-xl transition"
        >
          <FaCartPlus />
          View Product
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;