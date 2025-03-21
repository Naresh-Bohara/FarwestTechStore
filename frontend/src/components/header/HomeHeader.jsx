import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { BiLogIn } from "react-icons/bi";
import { HiUserAdd } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo2.png";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const HomeHeader = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [user, setUser] = useState();
  const {auth, setAuth} = useContext(AuthContext)
  const user = auth.loggedInUser

  const categoryList = useSelector((root)=>{
    return root?.category?.all
  })

  console.log({categoryList})

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setAuth({
      loggedInUser: null
    })
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar fluid rounded className="bg-teal-100 py-2 px-2 shadow-md">
        <Navbar.Brand as={NavLink} to="/" className="flex items-center">
          <img src={logo} className=" h-8 sm:h-11" alt="Farwest Tech Store Logo" />
          <span className="self-center me-1 dark:text-gray-100 whitespace-nowrap text-xl font-semibold text-[#214f52] hover:text-[#276c71]">
            Farwest Tech Store
          </span>
        </Navbar.Brand>

        {/* NavLinks for large screens */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className="text-gray-700 dark:text-gray-100 hover:text-teal-500 transition font-medium">
            Home
          </NavLink>
          <NavLink to="/about-us" className="text-gray-700 dark:text-gray-100 hover:text-teal-500 transition font-medium">
            About
          </NavLink>
          <Dropdown label={<span className="text-gray-700 hover:text-teal-500 dark:text-gray-100 transition font-medium">Categories</span>} inline>
            <Dropdown.Item as={NavLink} to="/category/robotics-kits">
              Robotics Kits
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/category/rcmotors">
              RC Motors
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/category/drones-uavs">
              Drones & UAVs
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/category/microcontrollers-boards">
              Microcontrollers & Boards
            </Dropdown.Item>
          </Dropdown>
          

          <NavLink to="/all-products" className="text-gray-600 dark:text-gray-100 hover:text-teal-500 transition font-medium">
            All Products
          </NavLink>
          <NavLink to="/contact" className="text-gray-600 dark:text-gray-100 hover:text-teal-500 transition font-medium">
            Contact
          </NavLink>
          <NavLink to="/cart" className="text-gray-600 dark:text-gray-100 hover:text-teal-500 transition flex items-center font-medium">
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 mr-1 dark:text-gray-100" />
            Cart
          </NavLink>
        </div>

        {/* User Dropdown and Sidebar Toggle */}
        <div className="flex items-center">
        <div className="scale-75">
      <DarkThemeToggle />
    </div>
          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={user.image || "/profileimage"} rounded  className="h-[5px]"/>}
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium text-gray-900">{user.name}</span>
                <span className="block truncate text-sm text-gray-500">{user.email}</span>
              </Dropdown.Header>
              <Dropdown.Item as={NavLink} to={`/${user.role}`}>
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/settings">
                Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="flex space-x-3">
              <NavLink
                to="/login"
                className="bg-teal-800 px-4 py-2 text-white rounded-full flex items-center hover:bg-teal-700 transition"
              >
                <span className="mr-1">Login</span>
                <BiLogIn className="text-lg" />
              </NavLink>
              <NavLink
                to="/sign-up"
                className="bg-teal-800 px-4 py-2 text-white rounded-full flex items-center hover:bg-teal-700 transition"
              >
                <span className="mr-1">Register</span>
                <HiUserAdd className="text-lg" />
              </NavLink>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="ml-3 text-gray-600 hover:text-teal-500 transition md:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
        </div>
      </Navbar>

      {/* Sidebar with Animation */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed top-0 left-0 z-50 w-72 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b bg-[#d5f5f6]">
          <div className="flex items-center">
            <img src={logo} className="mr-3 h-8" alt="Farwest Tech Store Logo" />
            <NavLink to={"/"}>
              <span className="text-lg font-semibold text-gray-800">Farwest Tech Store</span>
            </NavLink>
          </div>
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-teal-500">
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-4 space-y-4 px-5">
          <NavLink to="/" className="block text-gray-800 hover:text-teal-500" onClick={toggleSidebar}>
            Home
          </NavLink>
          <NavLink to="/about-us" className="block text-gray-800 hover:text-teal-500" onClick={toggleSidebar}>
            About
          </NavLink>
          <Dropdown label={<span className="block text-gray-800 hover:text-teal-500">Categories</span>} inline>
            <Dropdown.Item as={NavLink} to="/category/robotics-kits" onClick={toggleSidebar}>
              Robotics Kits
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/category/rcmotors" onClick={toggleSidebar}>
              RC Motors
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/category/drones-uavs" onClick={toggleSidebar}>
              Drones & UAVs
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/category/microcontrollers-boards" onClick={toggleSidebar}>
              Microcontrollers & Boards
            </Dropdown.Item>
          </Dropdown>
          <Dropdown label={<span className="block text-gray-800 hover:text-teal-500">Brands</span>} inline>
            <Dropdown.Item as={NavLink} to="/brand/NanoBoards" onClick={toggleSidebar}>
              Nano Boards
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/brand/Spark-Robotics" onClick={toggleSidebar}>
              Spark Robotics
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/brand/PowerTech-Motors" onClick={toggleSidebar}>
              PowerTech Motors
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/brand/AeroDrones" onClick={toggleSidebar}>
              AeroDrones
            </Dropdown.Item>
          </Dropdown>
          <NavLink to="/all-products" className="block text-gray-800 hover:text-teal-500" onClick={toggleSidebar}>
            All Products
          </NavLink>
          <NavLink to="/contact" className="block text-gray-800 hover:text-teal-500" onClick={toggleSidebar}>
            Contact
          </NavLink>
          <NavLink to="/cart" className="block text-gray-800 hover:text-teal-500 items-center" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 mr-1" />
            Cart
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default HomeHeader;
