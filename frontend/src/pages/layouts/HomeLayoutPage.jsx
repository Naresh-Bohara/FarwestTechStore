import React, { useContext } from "react";
import HomeHeader from "../../components/header/HomeHeader";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ThemeContext from "../../components/context/ThemeContext";

const HomeLayoutPage = () => {
  const themevalue = useContext(ThemeContext)
  // console.log(themevalue)
  return (
    <>
      <HomeHeader/>

      <Outlet />

      {/* Subscribe Section */}
      {/* bg-gradient-to-r from-teal-200 to-teal-300 p-8 rounded-lg shadow-lg */}
      <section className={`${themevalue.theme ==="light" ? "bg-teal-100" : "bg-gray-800"}`}>
        {
          themevalue.theme ==="light" ? <button onClick={(e)=>{
            themevalue.setTheme("dark")
          }}>Dark</button> : <button onClick={(e)=>{
            themevalue.setTheme("light")
          }}>Light</button>
        }
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="mb-4 text-4xl font-extrabold text-[#0a181a] sm:text-5xl">
            Join Our Newsletter!
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Stay updated with our latest products and exclusive offers. Enter
            your email below to subscribe.
          </p>
          <form action="#" className="flex flex-col sm:flex-row justify-center">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="mb-4 sm:mb-0 sm:mr-2 block w-full p-3 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-teal-400"
            />
            <button
              type="submit"
              className="py-3 px-5 w-full sm:w-auto text-sm font-medium text-white bg-teal-600 rounded-lg transition duration-300 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            We care about your privacy.{" "}
            <NavLink to={"#"} className="font-medium text-teal-600 hover:underline">
              Read our Privacy Policy
            </NavLink>
            .
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {/* Shop Section */}
            <div>
              <h2 className="mb-6 text-lg font-semibold hover:text-teal-300 cursor-pointer">Shop</h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Robotics
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Drones
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    AI Kits
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h2 className="mb-6 text-lg font-semibold hover:text-teal-300 cursor-pointer">Support</h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Help Center
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    FAQs
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Shipping & Returns
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to={"/contact"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h2 className="mb-6 text-lg font-semibold hover:text-teal-300 cursor-pointer">Legal</h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Terms & Conditions
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to={"#"}
                    className="hover:text-teal-300 transition duration-300"
                  >
                    Licensing
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="text-center">
              <h2 className="mb-6 text-lg font-semibold hover:text-teal-300 cursor-pointer">Follow Us</h2>
              <ul className="flex justify-center space-x-6">
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-teal-300"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="w-7 h-7" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-teal-300"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="w-7 h-7" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-teal-300"
                    aria-label="Twitter"
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="w-7 h-7" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-teal-300"
                    aria-label="YouTube"
                  >
                    <FontAwesomeIcon icon={faYoutube} className="w-7 h-7" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-6 border-gray-700" />
          <span className="block text-sm text-center text-gray-400 mt-4">
            © 2024{" "}
            <span className="font-semibold text-teal-600">
              Farwest Tech Store
            </span>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default HomeLayoutPage;
