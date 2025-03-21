import React from 'react';
import productImage from '../../assets/images/product.jpg'; 
import customer1 from '../../assets/images/avatar.png'; 
import customer2 from '../../assets/images/avatar.png';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductDetailsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb Section */}
      <nav className="mb-6 text-sm text-gray-500">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <a href="/" className="hover:text-[#213245]">Home</a>
          </li>
          <li>/</li>
          <li>
            <a href="/products" className="hover:text-[#213245]">Products</a>
          </li>
          <li>/</li>
          <li className="text-gray-700">RC 2205 Brushless Motor</li>
        </ol>
      </nav>

      {/* Product Header Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Product Image Section */}
        <div className="lg:w-1/2">
          <div className="relative">
            <img src={productImage} alt="Product RC 2205" className="rounded-lg shadow-xl w-full h-auto" />
            <span className="absolute top-4 left-4 bg-[#E0F7FA] text-gray-800 px-3 py-1 text-sm rounded-md">New Arrival</span>
          </div>
        </div>
        
        {/* Product Info Section */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-[#213245]">RC 2205 Brushless Motor</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            High-performance brushless motor designed for drones and robotics, ensuring powerful thrust and efficiency. Trusted by professionals for its precision and durability.
          </p>
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-[#213245]">Rs. 1450</span>
            <span className="text-gray-500 line-through">Rs. 1550</span>
            <span className="text-green-500 text-sm font-medium">Save 20%</span>
          </div>
          
          {/* Rating Section */}
          <div className="flex items-center space-x-2">
            {/* Font Awesome Star Icons */}
            <span className="flex items-center text-yellow-500 text-xl">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStar /> {/* Empty star */}
            </span>
            <span className="text-gray-500">(4.2/5 from 23 reviews)</span>
          </div>

          {/* Add to Cart and Quantity Selector */}
          <div className="flex items-center space-x-6">
            <input type="number" className="w-16 border border-gray-300 rounded-md text-center text-lg" defaultValue={1} min={1} />
            <button className="bg-[#213245] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#1b2731] transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="my-12">
        <h2 className="text-4xl font-bold text-[#213245] mb-6">Product Description</h2>
        <p className="text-lg text-gray-600 mb-6">
          The RC 2205 brushless motor offers high torque and efficiency, making it ideal for your drone or robotics projects. With precision engineering and superior build quality, this motor ensures consistent performance for all your needs.
        </p>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Max Thrust: 950g</li>
            <li>KV Rating: 2300KV</li>
            <li>Weight: 28g</li>
            <li>Input Voltage: 2-4S LiPo</li>
          </ul>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Durable and lightweight design</li>
            <li>High efficiency for extended flight times</li>
            <li>Perfect for drones and robotics applications</li>
            <li>Easy to install and maintain</li>
          </ul>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="my-12">
        <h2 className="text-4xl font-bold text-[#213245] mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#E0F7FA] rounded-lg shadow-md flex items-start space-x-4">
            <img src={customer1} alt="Customer 1" className="w-12 h-12 rounded-full" />
            <div>
              <p className="text-lg text-gray-600 mb-3">
                "Incredible motor! My drone’s flight time and stability have improved significantly."
              </p>
              <p className="text-sm font-semibold">- Alex M.</p>
            </div>
          </div>
          <div className="p-6 bg-[#E0F7FA] rounded-lg shadow-md flex items-start space-x-4">
            <img src={customer2} alt="Customer 2" className="w-12 h-12 rounded-full" />
            <div>
              <p className="text-lg text-gray-600 mb-3">
                "Excellent quality and great power. Highly recommended for robotics projects."
              </p>
              <p className="text-sm font-semibold">- Lisa K.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
