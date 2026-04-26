import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { resetCart } from "../../stores/cart.store";
import { useNavigate } from "react-router-dom";
import cartSvc from "./cart.service";
import { FaPaperPlane, FaSpinner, FaCheckCircle } from "react-icons/fa";

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

  /* ======================
     Autofill user
  ====================== */
  useEffect(() => {
    if (loggedInUser) {
      setValue("name", loggedInUser.name || "");
      setValue("email", loggedInUser.email || "");
      setValue("address", loggedInUser.address || "");
      setValue("gender", loggedInUser.gender || "");
      setValue("phone", loggedInUser.phone || "");
    }
  }, [loggedInUser, setValue]);

  /* ======================
     IMPORTANT FIX:
     DO NOT redirect instantly while order is processing/success
  ====================== */
  useEffect(() => {
    if (isPlacingOrder || orderSuccess) return;

    if (cart && cart.length === 0) {
      toast.info("Cart is empty");
      navigate("/products");
    }
  }, [cart, navigate, isPlacingOrder, orderSuccess]);

  /* ======================
     PLACE ORDER
  ====================== */
  const placeOrder = async (data) => {
    try {
      if (!data.paymentScreenshot) {
        toast.error("Payment screenshot is required");
        return;
      }

      setIsPlacingOrder(true);
      setOrderSuccess(false);

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

      toast.success("Order placed successfully");

      setOrderSuccess(true);
      setIsPlacingOrder(false);

      setTimeout(() => {
        navigate("/orders", { replace: true });
      }, 800);

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to place order");
      setOrderSuccess(false);
      setIsPlacingOrder(false);
    }
  };

  return (
    <section className="bg-white py-8 md:py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4">

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Checkout (QR Payment)
        </h2>

        <form onSubmit={handleSubmit(placeOrder)} className="space-y-6">

          {/* USER INFO */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

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
              <TextInputComponent control={control} name="phone" type="tel" />
            </div>

            <div className="sm:col-span-2">
              <InputLabelComponent label="Address" />
              <TextAreaComponent control={control} name="address" />
            </div>
          </div>

          {/* QR */}
          <div className="border p-4 rounded-lg text-center bg-gray-50 dark:bg-gray-800">
            <p className="mb-3 font-medium">Scan QR and pay</p>
            <img src="/qr.png" className="mx-auto w-48 h-48" />
          </div>

          {/* FILE */}
          <div>
            <InputLabelComponent label="Payment Screenshot" />

            <Controller
              control={control}
              name="paymentScreenshot"
              rules={{ required: "Screenshot is required" }}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border p-2 rounded"
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
                      className="mt-3 h-40 rounded object-cover"
                    />
                  )}

                  {errors?.paymentScreenshot && (
                    <p className="text-red-500 text-sm">
                      {errors.paymentScreenshot.message}
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
            className={`w-full flex justify-center items-center gap-2 rounded-lg py-3 text-white
              ${orderSuccess ? "bg-green-600" : "bg-primary-700 hover:bg-primary-800"}
              disabled:opacity-70`}
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