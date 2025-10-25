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
        _id: "1234568888882342",
        subTotal: summary.subTotal,
        discount: summary.discount,
        serviceCharge: 10000,
        tax: summary.tax,
        total: summary.total,
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
      if (!order) {
    return null; 
      }
   const amount = 1877097;
  const tax_amount = 215949;
  const service_charge = 10000;
  const delivery_charge = 10000;
  const total_amount = amount + tax_amount + service_charge + delivery_charge; // 2115046
  const transaction_uuid = "123456";
  const product_code = "EPAYTEST";
  const secretKey = "8gBm/:&EnhH.1/q";

  // Generate signature
  const signingString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const signature = Base64.stringify(CryptoJS.HmacSHA256(signingString, secretKey));

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Proceed to Pay</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="credit-card"
                      aria-describedby="credit-card-text"
                      type="radio"
                      name="payment-method"
                      defaultValue=""
                      className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                     
                    />
                  </div>

                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="credit-card"
                      className="font-medium leading-none text-gray-900 dark:text-white"
                    >
                      {" "}
                      eSewa{" "}
                    </label>
                    <p
                      id="credit-card-text"
                      className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                    >
                      Pay with eSewa
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                {
                    order ? <>
                      <form
                    action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                    method="POST"
                  >
                    <input
                      className="hidden"
                      type="text"
                      id="amount"
                      name="amount"
                      value={order.subTotal - order.discount + order.serviceCharge}
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="tax_amount"
                      name="tax_amount"
                      value={order.tax}
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="total_amount"
                      name="total_amount"
                      value={order.total}
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="transaction_uuid"
                      name="transaction_uuid"
                      value={order._id}
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="product_code"
                      name="product_code"
                      value="EPAYTEST"
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="product_service_charge"
                      name="product_service_charge"
                      value={order.serviceCharge}
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="product_delivery_charge"
                      name="product_delivery_charge"
                      value={order.deliveryCharge || 10000}
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="success_url"
                      name="success_url"
                      value="http://localhost:3000/epay-success"
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="failure_url"
                      name="failure_url"
                      value="http://localhost:3000/epay-failed"
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="signed_field_names"
                      name="signed_field_names"
                      value="total_amount,transaction_uuid,product_code"
                      required
                    />
                    <input
                      className="hidden"
                      type="text"
                      id="signature"
                      name="signature"
                      value={signature}
                      required
                    />
                    <input className="hidden" value="Submit" type="submit" />
                    <button
                      type="submit"
                      className="text-sm w-full bg-green-800 hover:bg-green-900  font-medium rounded-md text-white p-3 flex items-center justify-center hover:text-gray-50 dark:text-gray-50 dark:hover:text-white"
                    >
                      Proceed to Pay
                    </button>
                  </form></>:<></>
                }
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="pay-on-delivery"
                      aria-describedby="pay-on-delivery-text"
                      type="radio"
                      name="payment-method"
                      defaultValue=""
                      className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                    />
                  </div>

                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="pay-on-delivery"
                      className="font-medium leading-none text-gray-900 dark:text-white"
                    >
                      {" "}
                      Cash{" "}
                    </label>
                    <p
                      id="pay-on-delivery-text"
                      className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                    >
                      Pay with cash upon delivery
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Delete
                  </button>

                  <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                  <button
                    type="button"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CheckoutPage;
