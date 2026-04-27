import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { resetCart } from "../../stores/cart.store";
import { useNavigate } from "react-router-dom";
import cartSvc from "./cart.service";
import {
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import qrImage from "../../assets/images/404.jpg";

import {
  InputLabelComponent,
  RadioInputComponent,
  TextAreaComponent,
  TextInputComponent,
} from "../../components/form/InputComponent";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    auth: { loggedInUser },
  } = useContext(AuthContext);

  const cart = useSelector((state) => state?.cart?.cart);

  /* Autofill user */
  useEffect(() => {
    if (loggedInUser) {
      setValue("name", loggedInUser.name || "");
      setValue("email", loggedInUser.email || "");
      setValue("address", loggedInUser.address || "");
      setValue("gender", loggedInUser.gender || "");
      setValue("phone", loggedInUser.phone || "");
    }
  }, [loggedInUser, setValue]);

  /* Cart check */
  useEffect(() => {
    if (isPlacingOrder || orderSuccess) return;

    if (cart && cart.length === 0) {
      toast.info("Cart is empty");
      navigate("/products");
    }
  }, [cart, navigate, isPlacingOrder, orderSuccess]);

  /* PLACE ORDER */
  const placeOrder = async (data) => {
    try {
      if (!data.paymentScreenshot) {
        toast.error("Please upload payment screenshot");
        return;
      }

      setIsPlacingOrder(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("gender", data.gender);
      formData.append("cartItems", JSON.stringify(cart));
      formData.append("paymentScreenshot", data.paymentScreenshot);

      await cartSvc.qrCheckout(formData);

      dispatch(resetCart());

      setOrderSuccess(true);
      toast.success("Order placed successfully");

      setTimeout(() => {
        navigate("/orders", { replace: true });
      }, 1000);

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10">
      <div className="mx-auto max-w-2xl px-4">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Checkout
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Complete payment using QR and upload screenshot to confirm order
        </p>

        <form onSubmit={handleSubmit(placeOrder)} className="space-y-6">

          {/* USER INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <InputLabelComponent label="Full Name" />
              <TextInputComponent control={control} name="name" />
            </div>

            <div>
              <InputLabelComponent label="Email" />
              <TextInputComponent control={control} name="email" readonly />
            </div>

            <div>
              <InputLabelComponent label="Gender" />
              <RadioInputComponent
                control={control}
                name="gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />
            </div>

            <div>
              <InputLabelComponent label="Phone" />
              <TextInputComponent control={control} name="phone" />
            </div>

            <div className="sm:col-span-2">
              <InputLabelComponent label="Address" />
              <TextAreaComponent control={control} name="address" />
            </div>
          </div>

          {/* ⚠️ QR SECTION (HIGHLIGHTED) */}
          <div className="border-2 border-red-300 dark:border-red-500 rounded-xl p-5 bg-red-50 dark:bg-gray-800 text-center">

            <div className="flex items-center justify-center gap-2 text-red-600 font-semibold mb-2">
              <FaExclamationTriangle />
              Mandatory Payment Required
            </div>

            <p className="text-sm text-red-600 dark:text-red-400 mb-3">
              You must scan QR code below and complete payment before placing order
            </p>

            <img
              src={qrImage}
              className="mx-auto w-52 h-52 rounded-lg border shadow"
              alt="QR Code"
            />

            <p className="mt-2 text-xs text-gray-500">
              After payment, upload screenshot below
            </p>
          </div>

          {/* SCREENSHOT UPLOAD (IMPORTANT BOX) */}
          <div className=" p-4 bg-white dark:bg-gray-800">

            <InputLabelComponent label="Upload Payment Screenshot *" />

            <Controller
              control={control}
              name="paymentScreenshot"
              rules={{ required: "Payment screenshot is required" }}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border p-2 rounded mt-2"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        field.onChange(file);
                      }
                    }}
                  />

                  {preview && (
                    <img
                      src={preview}
                      className="mt-3 h-40 w-full object-cover rounded-lg border"
                      alt="Preview"
                    />
                  )}

                  {errors?.paymentScreenshot && (
                    <p className="text-red-600 text-sm mt-1 font-medium">
                      ⚠ {errors.paymentScreenshot.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isPlacingOrder || orderSuccess}
            className={`w-full flex justify-center items-center gap-2 rounded-lg py-3 font-medium text-white transition
              ${
                orderSuccess
                  ? "bg-green-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }
              disabled:opacity-60`}
          >
            {isPlacingOrder && <FaSpinner className="animate-spin" />}
            {isPlacingOrder && "Processing..."}

            {!isPlacingOrder && orderSuccess && (
              <>
                <FaCheckCircle />
                Order Successful
              </>
            )}

            {!isPlacingOrder && !orderSuccess && (
              <>
                <FaPaperPlane />
                Place Order
              </>
            )}
          </button>

        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;