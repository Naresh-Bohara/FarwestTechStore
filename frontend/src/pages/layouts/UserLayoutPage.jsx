import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/header/userTopHeader';
import Sidebar from '../../components/sidebar/Sidebar';

const UserLayoutPage = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={`flex flex-col h-screen ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        <main
          className={`flex-grow p-4 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Outlet />
        </main>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
    </div>
  );
};

export default UserLayoutPage;
