import { useState, useEffect, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import SingleCartItem from "./SingleCartItem";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyCartItems } from "../../stores/cart.store";
import { AuthContext } from "../context/AuthContext";

const UserCartViewDropdown = () => {
  const dispatch = useDispatch();
  const { auth } = useContext(AuthContext);
  const cartDetail = useSelector((state) => state.cart || { cart: [], counter: 0 });

  const [isOpen, setIsOpen] = useState(false);

  // Fetch cart items when user is logged in
  useEffect(() => {
    if (auth.loggedInUser) {
      dispatch(getMyCartItems());
    }
  }, [auth.loggedInUser, dispatch]);

  return (
    <div className="relative inline-block">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="relative inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-900 hover:bg-primary-100 dark:text-white dark:hover:bg-gray-700"
      >
        <span className="sr-only">Cart</span>
        <FaShoppingCart className="w-5 h-5" />
        {cartDetail.counter > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white shadow">
            {cartDetail.counter}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-80 max-h-[400px] overflow-y-auto rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
          {cartDetail.cart && cartDetail.cart.length > 0 ? (
            <>
              <div className="space-y-4">
                {cartDetail.cart.map((cartItem, index) => (
                  <SingleCartItem cartItem={cartItem} key={index} />
                ))}
              </div>

           { cartDetail.cart.length &&  <NavLink
                to={"/cart"}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                View Cart
              </NavLink> }
            </>
          ) : (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              No items in your cart.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCartViewDropdown;
