import { Card } from "flowbite-react";
import React from "react";
import { FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import { FaDollarSign, FaUsers } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";

const AdminDashboardPage = () => {
  // Sample static data
  const stats = {
    totalCustomers: 124,
    totalProducts: 56,
    totalRevenue: 456789,
    newOrders: 18,
    pendingOrders: 5,
    completedOrders: 1247,
    monthlySales: 234567,
    weeklyOrders: 12
  };

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Format currency in NPR
  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Customers Card */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex flex-col justify-between h-full p-6 bg-gradient-to-tl from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 rounded-lg">
            <FaUsers size={50} className="text-red-500 mb-4 mx-auto" />
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Total Customers</h5>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mt-2">
                {formatNumber(stats.totalCustomers)}
              </p>
              <p className="text-xs text-gray-600 mt-1">+12 this month</p>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex flex-col justify-between h-full p-6 bg-gradient-to-tl from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300 rounded-lg">
            <FaShoppingBasket size={50} className="text-teal-500 mb-4 mx-auto" />
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Total Products</h5>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mt-2">
                {formatNumber(stats.totalProducts)}
              </p>
              <p className="text-xs text-gray-600 mt-1">48 active</p>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex flex-col justify-between h-full p-6 bg-gradient-to-tl from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 rounded-lg">
            {/* <FaDollarSign size={50} className="text-yellow-500 mb-4 mx-auto" /> */}
            <span className="font-bold text-center text-[30px]">NPR</span>
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Total Revenue</h5>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mt-2">
                {formatCurrency(stats.totalRevenue/100)}
              </p>
              <p className="text-xs text-gray-600 mt-1">This month: {formatCurrency(stats.monthlySales)}</p>
            </div>
          </div>
        </div>

        {/* New Orders Card */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex flex-col justify-between h-full p-6 bg-gradient-to-tl from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-lg">
            <FaShoppingCart size={50} className="text-blue-500 mb-4 mx-auto" />
            <div className="text-center">
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">New Orders</h5>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-300 mt-2">
                {formatNumber(stats.newOrders)}
              </p>
              <p className="text-xs text-gray-600 mt-1">This week: {stats.weeklyOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {/* Pending Orders */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex items-center justify-between h-full p-6 bg-gradient-to-tl from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 rounded-lg">
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Orders</h5>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-300 mt-2">
                {formatNumber(stats.pendingOrders)}
              </p>
            </div>
            <MdOutlinePendingActions size={60} className="text-orange-500" />
          </div>
        </div>

        {/* Completed Orders */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex items-center justify-between h-full p-6 bg-gradient-to-tl from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 rounded-lg">
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Completed Orders</h5>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-300 mt-2">
                {formatNumber(stats.completedOrders)}
              </p>
            </div>
            <HiOutlineShoppingBag size={60} className="text-green-500" />
          </div>
        </div>

        {/* Average Order Value */}
        <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-600">
          <div className="flex items-center justify-between h-full p-6 bg-gradient-to-tl from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 rounded-lg">
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Avg. Order Value</h5>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-300 mt-2">
                {formatCurrency(4567)}
              </p>
            </div>
            {/* <FaDollarSign size={60} className="text-purple-500" /> */}
            <span className="font-bold text-center text-lg">NPR</span>
          </div>
        </div>
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-64 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Sales Chart (Weekly)
            <br />
            <span className="text-sm">[Chart will appear here]</span>
          </p>
        </div>
        <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-64 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Order Analytics
            <br />
            <span className="text-sm">[Chart will appear here]</span>
          </p>
        </div>
      </div>

      {/* Recent Orders Table - Only 5 rows */}
      <div className="border border-gray-300 rounded-lg shadow-md dark:border-gray-600 mb-6">
        <div className="p-4 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">#ORD-1001</td>
                <td className="px-6 py-4">Ram Sharma</td>
                <td className="px-6 py-4">2024-02-22</td>
                <td className="px-6 py-4">{formatCurrency(3456)}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Delivered</span></td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">#ORD-1002</td>
                <td className="px-6 py-4">Sita Rai</td>
                <td className="px-6 py-4">2024-02-22</td>
                <td className="px-6 py-4">{formatCurrency(5678)}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Processing</span></td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">#ORD-1003</td>
                <td className="px-6 py-4">Hari Thapa</td>
                <td className="px-6 py-4">2024-02-21</td>
                <td className="px-6 py-4">{formatCurrency(2345)}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Shipped</span></td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">#ORD-1004</td>
                <td className="px-6 py-4">Gita Karki</td>
                <td className="px-6 py-4">2024-02-21</td>
                <td className="px-6 py-4">{formatCurrency(7890)}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">Pending</span></td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">#ORD-1005</td>
                <td className="px-6 py-4">Bishnu GC</td>
                <td className="px-6 py-4">2024-02-20</td>
                <td className="px-6 py-4">{formatCurrency(1234)}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Delivered</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Stats - Minimal */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Today's Orders</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Week's Sales</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(234567)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">23</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;