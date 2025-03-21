import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo2.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  // const userDetail = JSON.parse(localStorage.getItem('user'));
  const {auth, setAuth} = useContext(AuthContext)
  const userDetail = auth.loggedInUser
  // const [userDetail, setUserDetail] = useState()
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between border-b border-gray-200 z-20">
      {/* Logo Section */}
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center">
          <img src={logo} className="h-8 mr-2" alt="Farwest Tech Store Logo" />
          <span className="text-xl font-semibold whitespace-nowrap">Farwest Tech Store</span>
        </NavLink>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button
          className="relative p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
          aria-label="Notifications"
        >
          <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
          <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-white" />
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 mx-3 rounded-full bg-gray-800"
            onClick={toggleDropdown}
            aria-label="User menu"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={userDetail?.image || 'https://via.placeholder.com/150'}
              alt="User"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 w-64 text-base bg-white divide-y divide-gray-200 shadow-lg rounded-lg">
              <div className="py-3 px-4">
                <p className="text-sm font-semibold text-gray-900">{userDetail?.name || 'Guest'}</p>
                <p className="text-sm text-gray-500 break-words">{userDetail?.email || 'guest@example.com'}</p>
              </div>
              <ul className="py-1 text-gray-700">
                <li>
                  <button
                    className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    My Profile
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Account Settings
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100 text-red-600"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Toggle (Mobile) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
