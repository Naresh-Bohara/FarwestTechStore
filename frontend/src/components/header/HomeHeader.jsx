import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  Spinner,
} from "flowbite-react";
import { BiLogIn } from "react-icons/bi";
import { HiUserAdd } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo2.png";
import { AuthContext } from "../context/AuthContext";
import UserCartViewDropdown from "../cart/UserCartViewDropdown";
import categorySvc from "../../pages/category/category.service";
import { useDispatch } from "react-redux";
import { resetCart } from "../../stores/cart.store";

const HomeHeader = () => {
  const navigate = useNavigate();
  const { auth, setAuth, loading: authLoading } = useContext(AuthContext);
  const user = auth?.loggedInUser;

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categorySvc.getForHomePage();
        if (response?.data) setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const logout = () => {
    localStorage.clear();
    setAuth({ loggedInUser: null });
    dispatch(resetCart());
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const dropdownClasses =
    "text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg";
  const dropdownItemClasses =
    "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-teal-700 dark:hover:text-teal-400";

  return (
    <>
      <Navbar
        fluid
        rounded
        className="bg-teal-100 dark:bg-gray-900 py-2 px-4 shadow-md"
      >
        <Navbar.Brand as={NavLink} to="/" className="flex items-center">
          <img src={logo} className="h-8 sm:h-11" alt="Farwest Tech Store" />
          <span className="text-xl font-semibold text-[#214f52] dark:text-gray-100 hover:text-[#276c71] ml-2">
            Farwest Tech Store
          </span>
        </Navbar.Brand>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-teal-500 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className="text-gray-700 dark:text-gray-200 hover:text-teal-500 font-medium"
          >
            About
          </NavLink>
          {loadingCategories ? (
            <Spinner size="sm" />
          ) : (
            <Dropdown
              label={
                <span className="text-gray-700 dark:text-gray-100 hover:text-teal-500 font-medium">
                  Categories
                </span>
              }
              inline
              arrowIcon
              className={dropdownClasses}
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Dropdown.Item
                    key={cat._id || cat.id}
                    className={dropdownItemClasses}
                    onClick={() => navigate(`/category/${cat.slug}`)}
                  >
                    {cat.slug}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled className="text-gray-400">
                  No Categories
                </Dropdown.Item>
              )}
            </Dropdown>
          )}
          <NavLink
            to="/products"
            className="text-gray-700 dark:text-gray-200 hover:text-teal-500 font-medium"
          >
            All Products
          </NavLink>
          <NavLink
            to="/contact"
            className="text-gray-700 dark:text-gray-200 hover:text-teal-500 font-medium"
          >
            Contact
          </NavLink>
          {/* <NavLink
            to="/cart"
            className="text-gray-700 dark:text-gray-200 hover:text-teal-500 flex items-center font-medium"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 mr-1" />{" "}
            Cart
          </NavLink> */}
        </div>

        <div className="flex items-center space-x-3">
          <DarkThemeToggle />
          <UserCartViewDropdown />

          {authLoading ? (
            <Spinner size="sm" className="w-10 h-10" />
          ) : user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User"
                  img={user.image || "/profileimage"}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.name}
                </span>
                <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => navigate(`/${user.role}`)}>
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/settings")}>
                Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="flex space-x-2">
              <NavLink
                to="/login"
                className="bg-teal-800 dark:bg-teal-700 px-4 py-2 text-white rounded-full flex items-center hover:bg-teal-700 dark:hover:bg-teal-600 transition"
              >
                <span className="mr-1">Login</span>
                <BiLogIn className="text-lg" />
              </NavLink>
              <NavLink
                to="/sign-up"
                className="bg-teal-800 dark:bg-teal-700 px-4 py-2 text-white rounded-full flex items-center hover:bg-teal-700 dark:hover:bg-teal-600 transition"
              >
                <span className="mr-1">Register</span>
                <HiUserAdd className="text-lg" />
              </NavLink>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="ml-2 text-gray-600 dark:text-gray-300 hover:text-teal-500 md:hidden"
          >
            <FontAwesomeIcon
              icon={isSidebarOpen ? faTimes : faBars}
              className="w-6 h-6"
            />
          </button>
        </div>
      </Navbar>

      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed top-0 left-0 z-50 w-72 h-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b dark:border-gray-700 bg-[#d5f5f6] dark:bg-gray-800">
          <div className="flex items-center">
            <img src={logo} className="mr-3 h-8" alt="Farwest Tech Store" />
            <NavLink to="/">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Farwest Tech Store
              </span>
            </NavLink>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
          >
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-4 space-y-4 px-5">
          <NavLink
            to="/"
            className="block text-gray-800 dark:text-gray-200 hover:text-teal-500 font-medium"
            onClick={toggleSidebar}
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className="block text-gray-800 dark:text-gray-200 hover:text-teal-500 font-medium"
            onClick={toggleSidebar}
          >
            About
          </NavLink>
          {loadingCategories ? (
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <Dropdown
              label={
                <span className="text-gray-700 dark:text-gray-100 font-medium">
                  Categories
                </span>
              }
              inline
              arrowIcon
              className={dropdownClasses}
            >
              {categories.map((cat) => (
                <Dropdown.Item
                  key={cat._id || cat.id}
                  className={dropdownItemClasses}
                  onClick={() => {
                    navigate(`/category/${cat.slug}`);
                    toggleSidebar();
                  }}
                >
                  {cat.slug}
                </Dropdown.Item>
              ))}
            </Dropdown>
          )}
          <NavLink
            to="/products"
            className="block text-gray-800 dark:text-gray-200 hover:text-teal-500 font-medium"
            onClick={toggleSidebar}
          >
            All Products
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-gray-800 dark:text-gray-200 hover:text-teal-500 font-medium"
            onClick={toggleSidebar}
          >
            Contact
          </NavLink>
          {/* <NavLink
            to="/cart"
            className="block text-gray-800 dark:text-gray-200 hover:text-teal-500 items-center font-medium"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 mr-1" />{" "}
            Cart
          </NavLink> */}
        </nav>
      </div>
    </>
  );
};

export default HomeHeader;
