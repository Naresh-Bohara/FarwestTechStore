import { BiSolidXCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import cartSvc from "../../pages/cart/cart.service";
import { useDispatch } from "react-redux";
import { getMyCartItems } from "../../stores/cart.store";

const SingleCartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const deleteCartItem = async () => {
    try {
      await cartSvc.updateCart({
        cartId: cartItem._id,
        quantity: 0,
      });

      // Refresh cart from backend
      dispatch(getMyCartItems());

      toast.success("Item removed from cart");
    } catch (exception) {
      toast.error("Error removing item from cart");
      console.error("Exception in removing cart item:", exception);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-3 dark:border-gray-700">
      {/* Left - Product info */}
      <div className="flex-1">
        <NavLink
          to={`/products/${cartItem.productId.slug}`}
          className="block truncate text-sm font-semibold text-gray-900 hover:underline dark:text-white"
        >
          {cartItem.productId.title}
        </NavLink>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          {new Intl.NumberFormat("np", {
            style: "currency",
            currency: "NPR",
          }).format(cartItem.productId.actualAmount / 100)}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Qty: {cartItem.quantity}
        </p>
      </div>

      {/* Right - Remove button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteCartItem();
        }}
        className="text-red-600 transition hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
        title="Remove item"
      >
        <BiSolidXCircle className="h-5 w-5" />
        <span className="sr-only">Remove</span>
      </button>
    </div>
  );
};

export default SingleCartItem;
