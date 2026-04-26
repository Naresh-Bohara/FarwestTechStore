import React from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus, FaStar, FaStarHalfAlt, FaRegStar, FaShippingFast, FaTags } from "react-icons/fa";

const ProductGridList = ({ product }) => {
  // Safely access product properties with fallbacks
  const title = product?.title || 'Unnamed Product';
  const slug = product?.slug || '#';
  const price = product?.price || 0;
  const discount = product?.discount || 0;
  const actualAmount = product?.actualAmount || price;
  const images = product?.images || [];
  const avgRating = product?.avgRating || 0;
  const totalReviews = product?.totalReviews || 0;

  // Format prices with 2 decimal places (since values are in paisa)
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(actualAmount / 100);

  const formattedOriginalPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price / 100);

  // Calculate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition duration-300 dark:border-gray-700 dark:bg-gray-800">
      {/* Product Image */}
      <div className="h-56 w-full">
        <NavLink
          to={`/products/${slug}`}
          className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md"
        >
          <img
            className="mx-auto h-full object-contain"
            src={
              images[0] ||
              "https://placehold.co/600x400/80d1d2/ffffff?text=No+Image"
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/80d1d2/ffffff?text=No+Image";
            }}
            alt={title}
          />
          
          {/* Discount Badge - Shows at top right */}
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              {discount}% OFF
            </span>
          )}
        </NavLink>
      </div>

      {/* Product Details */}
      <div className="pt-6">
        {/* Discount Badge (Text version) */}
        {discount > 0 && (
          <span className="inline-block mb-2 rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
            Save {discount}%
          </span>
        )}

        {/* Title */}
        <NavLink
          to={`/products/${slug}`}
          className="block text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {title}
        </NavLink>

        {/* Ratings */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex">{renderStars(avgRating)}</div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {avgRating.toFixed(1)}
          </p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            ({totalReviews})
          </p>
        </div>

        {/* Features */}
        <ul className="mt-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-center gap-2">
            <FaShippingFast className="text-gray-500 dark:text-gray-400" />
            Fast Delivery
          </li>
          <li className="flex items-center gap-2">
            <FaTags className="text-gray-500 dark:text-gray-400" />
            Best Price
          </li>
        </ul>

        {/* Price Section */}
        <div className="mt-4 flex items-center gap-2">
          {discount > 0 ? (
            <>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {formattedPrice}
              </p>
              <p className="text-sm text-gray-400 line-through">
                {formattedOriginalPrice}
              </p>
            </>
          ) : (
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {formattedPrice}
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <div className="mt-4">
          <NavLink
            to={`/products/${slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <FaCartPlus />
            Add to cart
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductGridList;