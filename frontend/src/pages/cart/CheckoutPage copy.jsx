import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { TickIcon } from "../../components/icons/icons.component";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import {
  InputLabelComponent,
  RadioInputComponent,
  TextAreaComponent,
  TextInputComponent,
} from "../../components/form/InputComponent";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import cartSvc from "./cart.service";
import { resetCart } from "../../stores/cart.store";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [order, setOrder] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const updateUser = (data) => {
    const geolocatioin = navigator.geolocation.getCurrentPosition(
      (position) => {
        return {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
      },
      (error) => {
        console.log(error);
      }
    );

    data.geoCoords = geolocatioin;
  };

  const {
    auth: { loggedInUser },
  } = useContext(AuthContext);

  useEffect(() => {
    if (loggedInUser) {
      setValue("name", loggedInUser.name);
      setValue("email", loggedInUser.email);
      setValue("address", loggedInUser.address);
      setValue("gender", loggedInUser.gender);
      setValue("phone", loggedInUser.phone);
    }
  }, [loggedInUser]);

  const [summary, setSummary] = useState({
    subTotal: 0,
    discount: 0,
    delivery: 0,
    tax: 0,
    total: 0,
  });

  const cart = useSelector((state) => {
    return state?.cart?.cart;
  });

  useEffect(() => {
    let subTotal = 0;
    if (cart && cart.length) {
      cart.map((item) => {
        subTotal += +item.amount;
      });
    }
    if (subTotal > 0) {
      setSummary({
        subTotal: subTotal,
        discount: 0,
        delivery: 10000,
        tax: (subTotal + 10000) * 0.13,
        total: subTotal - 0 + 10000 + (subTotal + 10000) * 0.13,
      });
    } else {
      setSummary({
        subTotal: 0,
        discount: 0,
        delivery: 1000,
        tax: 1300,
        total: 1000 + 1300,
      });
    }
    if (cart && cart.length === 0) {
      toast.info(
        "Your cart is empty. Please add items to cart before checkout."
      );
      navigate(`/products`);
    }
  }, [cart]);

  const placeOrder = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        cartId: cart.map((item) => item._id),
        discount: 0,
      };

      // const response =  await cartSvc.placeOrder(payload);
      const responsne = {
        _id: "123456212342",
        subTotal: summary.subTotal/100,
        discount: summary.discount/100,
        serviceCharge: 10000/100,
        tax: summary.tax/100,
        total: summary.total/100,
      };
      setOrder(responsne);
      setOpenPaymentModal(true);
      // toast.success("Order placed successfully");
      // dispatch(resetCart())
      // console.log(response);

      // TODO: Payment integration

      // redirect
      // navigate(`/${loggedInUser?.role}/orders`);
    } catch (exception) {
      toast.error("Failed to place order");
      console.log(exception);
    }
  };
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <TickIcon />
                Cart
              </span>
            </li>

            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <TickIcon />
                Checkout
              </span>
            </li>

            <li className="flex shrink-0 items-center">
              <TickIcon />
              Order summary
            </li>
          </ol>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delivery Details
                </h2>
                <form action="" onSubmit={handleSubmit(updateUser)}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <InputLabelComponent
                        htmlFor={"name"}
                        label={"Full Name"}
                      />
                      <TextInputComponent
                        control={control}
                        name={"name"}
                        defaultValue={loggedInUser?.name}
                      />
                    </div>

                    <div>
                      <InputLabelComponent htmlFor={"email"} label={"Email"} />
                      <TextInputComponent
                        control={control}
                        readonly={true}
                        name={"email"}
                        defaultValue={loggedInUser?.email}
                      />
                    </div>

                    <div>
                      <InputLabelComponent htmlFor={"email"} label={"Email"} />
                      <RadioInputComponent
                        control={control}
                        name="gender"
                        errorMsg={errors?.gender?.message}
                        options={[
                          { label: "Male", value: "male" },
                          { label: "Female", value: "female" },
                          { label: "Other", value: "other" },
                        ]}
                      />
                    </div>

                    <div>
                      <InputLabelComponent
                        htmlFor="phone"
                        label="Phone Number"
                      />
                      <TextInputComponent
                        errorMsg={errors?.phone?.message}
                        control={control}
                        type="tel"
                        name="phone"
                        placeholder="Enter your Phone number"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <InputLabelComponent htmlFor="address" label="Address" />
                      <TextAreaComponent
                        errorMsg={errors?.address?.message}
                        control={control}
                        name="address"
                        placeholder="Enter your Address"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 hover:text-primary-50 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-primary-800 dark:focus:ring-gray-700"
                      >
                        <FaPaperPlane className="h-5 w-5" />
                        Add new address
                      </button>
                    </div>
                  </div>
                </form>
              </div>

            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("np", {
                        style: "currency",
                        currency: "NPR",
                      }).format(summary.subTotal / 100)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-500">
                      -{" "}
                      {new Intl.NumberFormat("np", {
                        style: "currency",
                        currency: "NPR",
                      }).format(summary.discount / 100)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("np", {
                        style: "currency",
                        currency: "NPR",
                      }).format(summary.delivery / 100)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("np", {
                        style: "currency",
                        currency: "NPR",
                      }).format(summary.tax / 100)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("np", {
                        style: "currency",
                        currency: "NPR",
                      }).format(summary.total / 100)}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={placeOrder}
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Place your Order
                </button>

                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  One or more items in your cart require an account.{" "}
                  <a
                    href="#"
                    title=""
                    className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Sign in or create an account now.
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PaymentModal
        openModal={openPaymentModal}
        setOpenModal={setOpenPaymentModal}
        order={order}
      />
    </>
  );
};

const PaymentModal = ({ openModal, setOpenModal, order }) => {
   if (!order) return null;

  // Convert amounts to integers (NPR)
  const amount = Math.floor(order.subTotal - order.discount); // e.g., 1651148
  const tax_amount = Math.floor(order.tax);                   // e.g., 215949
  const service_charge = Math.floor(order.serviceCharge || 0); 
  const delivery_charge = Math.floor(order.deliveryCharge || 10000);

  // Total amount in NPR (sum of all components)
  const total_amount = amount + tax_amount + service_charge + delivery_charge;

  // Unique transaction UUID (timestamp + random number)
  const transaction_uuid = `${Date.now()}${Math.floor(Math.random() * 1000000)}`;

  const product_code = "EPAYTEST";

  // Fields that eSewa will sign
  const signedFields = ["total_amount", "transaction_uuid", "product_code"];
  const fieldValues = { total_amount, transaction_uuid, product_code };

  // Generate signing string
  const signingString = signedFields.map(f => `${f}=${fieldValues[f]}`).join(",");

  // Generate HMAC SHA256 signature
  const secretKey = "8gBm/:&EnhH.1/q"; 
  const hash = CryptoJS.HmacSHA256(signingString, secretKey);
  const signature = Base64.stringify(hash);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <ModalHeader>Proceed to Pay</ModalHeader>
      <ModalBody>
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          {/* Amount fields */}
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="tax_amount" value={tax_amount} />
          <input type="hidden" name="product_service_charge" value={service_charge} />
          <input type="hidden" name="product_delivery_charge" value={delivery_charge} />
          <input type="hidden" name="total_amount" value={total_amount} />
          <input type="hidden" name="transaction_uuid" value={transaction_uuid} />
          <input type="hidden" name="product_code" value={product_code} />

          {/* Signed fields and signature */}
          <input type="hidden" name="signed_field_names" value={signedFields.join(",")} />
          <input type="hidden" name="signature" value={signature} />

          {/* URLs */}
          <input type="hidden" name="success_url" value="http://localhost:3000/epay-success" />
          <input type="hidden" name="failure_url" value="http://localhost:3000/epay-failed" />

          <button
            type="submit"
            className="w-full bg-green-700 p-2 rounded text-white mt-4"
          >
            Pay with eSewa
          </button>
        </form>
      </ModalBody>
    </Modal>
    
  );
};

export default CheckoutPage;
