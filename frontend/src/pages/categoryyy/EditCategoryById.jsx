import React, { useState } from 'react';

const EditCategoryById = () => {
  const [categoryName, setCategoryName] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Category Name:', categoryName);
    console.log('Status:', isActive ? 'Active' : 'Inactive');
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <h1 className="text-2xl font-bold text-teal-950 py-3 border-b-2 border-teal-700">
        Edit Category
      </h1>
      <div className="mx-auto my-3 px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                id="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                placeholder="Enter category name"
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                <span className={`relative inline-flex items-center cursor-pointer`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                  <div className={`w-10 h-6 rounded-full shadow-inner ${isActive ? 'bg-teal-600' : 'bg-gray-400'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isActive ? 'transform translate-x-full bg-teal-500' : ''}`}></div>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCategoryById;
