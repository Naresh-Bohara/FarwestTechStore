import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faTachometerAlt,
  faClipboardList,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';

const CustomerSidebar = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <aside
      className={`bg-white border-r border-gray-200 h-full fixed md:static w-64 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-20`}
    >
      <nav className="mt-6">
        <ul className="space-y-2">
          {[
            { to: "/", icon: faHome, label: "Home" },
            { to: "/customer/dashboard", icon: faTachometerAlt, label: "Dashboard" },
            { to: "/customer/orders", icon: faClipboardList, label: "My Orders" },
            { to: "/customer/chat", icon: faMessage, label: "Chat" },
          ].map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-900 hover:bg-gray-100"
                  }`
                }
                onClick={closeSidebar}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-6 h-6 ${
                    window.location.pathname === item.to
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                />
                <span className="ml-3">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default CustomerSidebar;
