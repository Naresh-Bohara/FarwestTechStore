import React from 'react';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Apple iMac 27"',
    image: 'https://via.placeholder.com/100',
    category: 'Computers',
    price: '$2,000',
    discountPrice: '$1,800',
    status: 'Active',
    featured: true,
    createdAt: '01/01/2024',
    updatedAt: '01/02/2024',
  },
  {
    id: 2,
    name: 'Dell XPS 13',
    image: 'https://via.placeholder.com/100',
    category: 'Laptops',
    price: '$1,200',
    discountPrice: '$1,000',
    status: 'Inactive',
    featured: false,
    createdAt: '02/15/2024',
    updatedAt: '02/16/2024',
  },
  {
    id: 3,
    name: 'HP Spectre x360',
    image: 'https://via.placeholder.com/100',
    category: 'Laptops',
    price: '$1,500',
    discountPrice: '$1,200',
    status: 'Active',
    featured: true,
    createdAt: '03/10/2024',
    updatedAt: '03/11/2024',
  },
];

const ProductListPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <h1 className="text-2xl font-bold text-teal-950 py-3 border-b-2 border-teal-700">
        Product List
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
                to={"/admin/product/create"}
                className="flex items-center justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
              >
                <FaPlus />
                Add Product
              </NavLink>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {products.map(product => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <img src={product.image} alt={product.name} className="rounded mb-2" />
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">Category: {product.category}</p>
                <p className="text-gray-600 dark:text-gray-300">Price: {product.price}</p>
                <p className="text-gray-600 dark:text-gray-300">Discount Price: {product.discountPrice}</p>
                <p className="text-gray-600 dark:text-gray-300">Status: {product.status}</p>
                <p className="text-gray-600 dark:text-gray-300">Featured: {product.featured ? 'Yes' : 'No'}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <NavLink
                    to={`/admin/product/edit/${product.id}`}
                    className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-900"
                  >
                    <FaPen className="text-white" />
                  </NavLink>
                  <NavLink
                    to={`/admin/product/delete/${product.id}`}
                    className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-800"
                  >
                    <FaTrash className="text-white" />
                  </NavLink>
                </div>
              </div>
            ))}
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

export default ProductListPage;
