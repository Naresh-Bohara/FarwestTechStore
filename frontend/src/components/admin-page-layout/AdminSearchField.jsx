import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const AdminSearchField = ({loading=true, setSearch}) => {
  return (
    <form onSubmit={(e)=>e.preventDefault()} className="flex items-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        {/* Icon */}
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
          <FaSearch className='text-gray-500'/>
        </span>
        {/* Input Field */}
        <input
          type="text"
          id="simple-search"
          readOnly={loading}
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
          placeholder="Search"
          required
        />
      </div>
    </form>
  );
};
