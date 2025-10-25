import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const CategoryListPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <h1 className="text-2xl font-bold text-teal-950 py-3 border-b-2 border-teal-700">
        Category List
      </h1>
      <div className="mx-auto my-3 px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <NavLink
                to={"/admin/category/create"}
                className="flex items-center justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
              >
                Add Category
              </NavLink>
            </div>
          </div>
          <div className="overflow-x-auto md:overflow-visible">
            <table className="hidden md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-teal-200 uppercase bg-teal-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Name</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Created At</th>
                  <th scope="col" className="px-4 py-3">Updated At</th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Electronics</th>
                  <td className="px-4 py-3">Active</td>
                  <td className="px-4 py-3">01/01/2024</td>
                  <td className="px-4 py-3">01/10/2024</td>
                  <td className="px-4 py-3 flex items-center justify-end">
                    <NavLink
                      to={"/admin/categories/edit/1234"}
                      className="w-8 h-8 bg-teal-700 rounded-full me-2 flex items-center justify-center hover:bg-teal-900"
                    >
                      <FaPen className="text-white" />
                    </NavLink>
                    <NavLink
                      to={"/admin/category/delete/1234"}
                      className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-800"
                    >
                      <FaTrash className="text-white" />
                    </NavLink>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="flex flex-col">
                <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
                  <h2 className="font-bold">Electronics</h2>
                  <p><strong>Status:</strong> Active</p>
                  <p><strong>Created At:</strong> 01/01/2024</p>
                  <p><strong>Updated At:</strong> 01/10/2024</p>
                  <div className="flex justify-end mt-2">
                    <NavLink
                      to={"/admin/category/edit/1234"}
                      className="w-8 h-8 bg-teal-700 rounded-full me-2 flex items-center justify-center hover:bg-teal-900"
                    >
                      <FaPen className="text-white" />
                    </NavLink>
                    <NavLink
                      to={"/admin/category/delete/1234"}
                      className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-800"
                    >
                      <FaTrash className="text-white" />
                    </NavLink>
                  </div>
                </div>
                {/* Add more card rows as needed */}
              </div>
            </div>
          </div>
          <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  {/* Previous Arrow */}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              {/* More Pagination Links */}
              <li>
                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  {/* Next Arrow */}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default CategoryListPage;
