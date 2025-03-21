import { Card } from "flowbite-react";
import React from "react";
import { FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import { FaDollarSign, FaUsers } from "react-icons/fa6";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Customers Card */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex flex-col justify-between h-full p-6 bg-gradient-to-tl from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 rounded-lg">
            <FaUsers size={50} className="text-red-500 mb-4 mx-auto" />
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Customers</h5>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mt-2">1,000</p>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex flex-col justify-between h-full p-6 bg-gradient-to-tl from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300 rounded-lg">
            <FaShoppingBasket size={50} className="text-teal-500 mb-4 mx-auto" />
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h5>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mt-2">1,200</p>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex flex-col justify-between h-full p-6 bg-gradient-to-tl from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 rounded-lg">
            <FaDollarSign size={50} className="text-yellow-500 mb-4 mx-auto" />
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Total Revenue</h5>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mt-2">
                NPR 1,234,567,890
              </p>
            </div>
          </div>
        </div>

        {/* New Orders Card */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex flex-col justify-between h-full p-6 bg-gradient-to-tl from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-lg">
            <FaShoppingCart size={50} className="text-blue-500 mb-4 mx-auto" />
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">New Orders</h5>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mt-2">123</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
      </div>
      <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
