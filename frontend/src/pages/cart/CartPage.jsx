import { FaArrowRight, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import cartSvc from "./cart.service";
import { getMyCartItems } from "../../stores/cart.store";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* ================= CART ITEM ================= */
const CartItemList = ({ item }) => {
  const dispatch = useDispatch();

  const quantity = item?.quantity || 1;

  const updateCart = async (qty) => {
    try {
      await cartSvc.updateCart({
        cartId: item._id,
        quantity: qty,
      });

      toast.success("Cart updated successfully.");
      dispatch(getMyCartItems());
    } catch (err) {
      toast.error("Error while updating cart");
      console.log(err);
    }
  };

  const productImages = item?.productId?.images || [];
  const productTitle = item?.productId?.title || "Product";
  const productSlug = item?.productId?.slug || "#";

  // price in paisa
  const price = item?.productId?.price || 0;
  const discountPercent = item?.productId?.discount || 0;

  const discountedPrice = price - (price * discountPercent) / 100;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">

        {/* Image */}
        <a href="#" className="shrink-0 md:order-1">
          <img
            className="h-20 w-20 dark:hidden"
            src={
              productImages[0] ||
              "https://placehold.co/600x400/80d1d2/ffffff?text=No+Image"
            }
            alt={productTitle}
          />
        </a>

        {/* Quantity */}
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">

            <button
              onClick={() => quantity > 1 && updateCart(quantity - 1)}
              className="h-5 w-5 bg-gray-100 rounded-md"
            >
              <FaMinus />
            </button>

            <span className="w-10 text-center">{quantity}</span>

            <button
              onClick={() => updateCart(quantity + 1)}
              className="h-5 w-5 bg-gray-100 rounded-md"
            >
              <FaPlus />
            </button>
          </div>

          {/* Price */}
          <div className="text-end md:w-32">
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "NPR",
                minimumFractionDigits: 0,
              }).format(discountedPrice/100)}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 md:order-2">
          <NavLink to={`/products/${productSlug}`}>
            {productTitle}
          </NavLink>

          <button
            onClick={() => updateCart(0)}
            className="text-red-600 text-sm mt-2 flex items-center gap-1"
          >
            <FaTimes /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= CART PAGE ================= */
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state?.cart?.cart);

  const [summary, setSummary] = useState({
    subTotal: 0,
    discount: 0,
    delivery: 10000, // 100 Rs in paisa
    total: 0,
  });

  useEffect(() => {
    let subTotal = 0;
    let totalDiscount = 0;

    if (cart?.length) {
      cart.forEach((item) => {
        const price = item?.productId?.price || 0;
        const qty = item?.quantity || 1;
        const discountPercent = item?.productId?.discount || 0;

        const itemTotal = price * qty;
        const itemDiscount = (itemTotal * discountPercent) / 100;

        subTotal += itemTotal;
        totalDiscount += itemDiscount;
      });
    }

    const delivery = cart?.length ? 10000 : 0;

    const total = subTotal - totalDiscount + delivery;

    setSummary({
      subTotal,
      discount: totalDiscount,
      delivery,
      total,
    });

    if (cart && cart.length === 0) {
      toast.info("Cart is empty");
      navigate("/products");
    }
  }, [cart, navigate]);

  return (
    <section className="bg-primary-50 py-8 dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4">

        <h2 className="text-xl font-semibold">Shopping Cart</h2>

        {cart?.length > 0 ? (
          <div className="mt-6 lg:flex gap-8">

            {/* LEFT */}
            <div className="flex-1 space-y-4">
              {cart.map((item, i) => (
                <CartItemList key={item._id || i} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "NPR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(summary.subTotal/100)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        - {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "NPR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(summary.discount/100)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Delivery Charge
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "NPR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(summary.delivery/100)}
                      </dd>
                    </dl>
{/* 
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax (13%)
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "NPR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(summary.tax/100)}
                      </dd>
                    </dl> */}
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "NPR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(summary.total/100)}
                    </dd>
                  </dl>
                </div>

                <NavLink
                  to={"/checkout"}
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to Checkout
                </NavLink>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    or
                  </span>
                  <NavLink
                    to={"/products"}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <FaArrowRight />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center mt-10">Cart is empty</p>
        )}
      </div>
    </section>
  );
};

export default CartPage;