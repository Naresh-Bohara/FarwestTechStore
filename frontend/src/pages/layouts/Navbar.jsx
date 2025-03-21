import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch, faBell, faArrowUp, faUserPlus, faHeart, faComment, faVideo } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo2.png";
import user from "../../assets/images/avatar.png"; // Update the path to your logo

const Navbar = () => {
  // State to manage sidebar visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          {/* Left Side - Logo and Hamburger Menu */}
          <div className="flex justify-start items-center">
            <button
              onClick={toggleSidebar} // Attach toggle function here
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" aria-hidden="true" />
              <span className="sr-only">Toggle sidebar</span>
            </button>

            <NavLink to="/" className="flex items-center justify-between mr-4">
              <img src={logo} className="mr-3 h-8" alt="Farwest Tech Store Logo" />
              <span className="self-center text-2xl ml-[-12px] font-semibold whitespace-nowrap dark:text-white">
                Farwest Tech Store
              </span>
            </NavLink>
          </div>

          {/* Right Side - Search and Notifications */}
          <div className="flex items-center lg:order-2">
            {/* Search Button */}
            <button
              type="button"
              className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle search</span>
              <FontAwesomeIcon icon={faSearch} className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Notification Button */}
            <button
              type="button"
              className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">View notifications</span>
              <FontAwesomeIcon icon={faBell} className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Apps Button */}
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">View apps</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (Example implementation) */}
      {isOpen && (
        <aside className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white shadow-lg">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Sidebar</h2>
            <NavLink to="/" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Home</NavLink>
            <NavLink to="/about" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">About</NavLink>
            <NavLink to="/contact" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Contact</NavLink>
            {/* Add more links as needed */}
          </div>
        </aside>
      )}
    </>
  );
};

export default Navbar;
