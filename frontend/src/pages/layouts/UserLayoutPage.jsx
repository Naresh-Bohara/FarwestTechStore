import React, { useContext, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/header/userTopHeader";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import CustomerSidebar from "../../components/sidebar/UserSidebar";
import SellerSidebar from "../../components/sidebar/SellerSidebar";
import { AuthContext } from "../../components/context/AuthContext";

const UserLayoutPage = () => {
  const { auth: loggedInUser } = useContext(AuthContext);
  const role = loggedInUser?.loggedInUser?.role || "customer";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Dynamically determine which sidebar to render
  const SidebarComponent = useMemo(() => {
    switch (role) {
      case "admin":
        return AdminSidebar;
      case "seller":
        return SellerSidebar;
      default:
        return CustomerSidebar; 
    }
  }, [role]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Top Navbar */}
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Layout wrapper */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar (Admin / Customer) */}
        {SidebarComponent && (
          <SidebarComponent
            isSidebarOpen={isSidebarOpen}
            closeSidebar={closeSidebar}
          />
        )}

        {/* Main content area */}
        <main
          className={`flex-grow p-4 md:p-6 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "opacity-50 md:opacity-100" : "opacity-100"
          }`}
        >
          <Outlet />
        </main>

        {/* Background overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Footer gradient */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700" />
    </div>
  );
};

export default UserLayoutPage;
