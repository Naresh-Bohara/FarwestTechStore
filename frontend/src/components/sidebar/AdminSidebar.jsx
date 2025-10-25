import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faImage,
  faShoppingBag,
  faThLarge,
  faClipboardList,
  faTag,
  faUsers,
  faMessage
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <aside
      className={`bg-white border-r border-gray-200 h-full fixed md:static w-64 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-20`}
    >
      <nav className="mt-6">
        <ul className="space-y-2">
          {[
            { to: "/admin", icon: faTachometerAlt, label: "Dashboard" },
            { to: "/admin/banners", icon: faImage, label: "Banners" },
            { to: "/admin/products", icon: faShoppingBag, label: "Products" },
            { to: "/admin/brands", icon: faTag, label: "Brands" },
            { to: "/admin/categories", icon: faThLarge, label: "Categories" },
            { to: "/admin/orders", icon: faClipboardList, label: "Orders" },
            { to: "/admin/users", icon: faUsers, label: "Users" },
            { to: "/admin/chat", icon: faMessage, label: "Chat" },

          ].map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                onClick={closeSidebar}
              >
                <FontAwesomeIcon icon={item.icon} className="w-6 h-6 text-gray-500" />
                <span className="ml-3">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};



export default Sidebar;
