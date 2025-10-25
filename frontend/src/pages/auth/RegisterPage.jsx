import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Spinner } from "flowbite-react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import registerPageImg from "../../assets/images/register-page.jpeg";
import { useForm } from "react-hook-form";
import {
  ImageUploader,
  InputLabelComponent,
  PasswordInputComponent,
  RadioInputComponent,
  SelectOptionComponent,
  TextAreaComponent,
  TextInputComponent,
} from "../../components/form/InputComponent";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import authSvc from "./auth.service";
import { setErrorInfo } from "../../utilities/helpers";
import { toast } from "react-toastify";
import { FormActionButton } from "../../components/button/form-action-btn.component";
import { AuthContext } from "../../components/context/AuthContext";

// ======================== Validation Schema ========================
const registerDTO = Yup.object({
  fullName: Yup.string()
    .matches(
      /^[a-zA-Z]+(?: [a-zA-Z]+){1,2}$/,
      "Full name must contain at least a first and surname, with optional middle name."
    )
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),

  email: Yup.string().email("Invalid email address").required("Email is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.,])[A-Za-z\d@$!%*?&#.,]{8,25}$/,
      "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
    )
    .required("Password is required"),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),

  role: Yup.string().oneOf(["seller", "customer"], "Select a valid role").required("Role is required"),

  gender: Yup.string().matches(/^(male|female|other)$/, "Select a valid gender").required("Gender is required"),

  phone: Yup.string()
    .matches(
      /^(\+?977-)?(98|97)\d{8}$/,
      "Phone number must start with '977-' or '+977-' (optional), followed by '98' or '97', and 8 digits."
    )
    .optional()
    .nullable(),

  address: Yup.string().min(10, "Address must be at least 10 characters long").optional().nullable(),
});

// ======================== Component ========================
const RegisterPage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // For registration submit
  const [modalLoading, setModalLoading] = useState(false); // For OTP
  const [checkingAuth, setCheckingAuth] = useState(true); // NEW: check auth before showing page
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);

  const { control, handleSubmit, formState: { errors }, register, setError } = useForm({
    resolver: yupResolver(registerDTO),
  });


  // ======================== Check Login ========================
   useEffect(() => {
    const checkUser = async () => {
      try {
        if (auth?.loggedInUser) {
          toast.info("You are already logged in.");
          navigate(`/${auth.loggedInUser.role}`);
        } else {
          const token = localStorage.getItem("token");
          const userInfo = JSON.parse(localStorage.getItem("user"));
          if (token && userInfo) {
            toast.info("You are already logged in.");
            navigate(`/${userInfo.role}`);
          }
        }
      } catch (err) {
        setErrorInfo(err);
      } finally {
        setCheckingAuth(false); // Done checking
      }
    };

    checkUser();
  }, [auth, navigate]);

  // ======================== Submit Registration ========================
  const submitEvent = async (data) => {
    setLoading(true);
    data.image = image;
    try {
      const response = await authSvc.registerUser(data);
      setUser(response.data);
      setOpenModal(true);
    } catch (exception) {
      setErrorInfo(exception, setError);
    } finally {
      setLoading(false);
    }
  };

  // ======================== Activate User ========================
  const activateUser = async () => {
    setModalLoading(true);
    try {
      await authSvc.activateUserByOtp({ otp, email: user?.email });
      toast.success("Account activated! Please login.");
      navigate("/login");
    } catch (exception) {
      if (exception?.data?.message === "Incorrect OTP code") {
        toast.error(exception.data.message);
      } else {
        setErrorInfo(exception, setError);
      }
    } finally {
      setModalLoading(false);
    }
  };

  // ======================== Loading UI ========================
  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-cyan-600" />
      </div>
    );
  }

  // ======================== Render ========================
  return (
    <>
      {
        loading ? <>loading...</> : <>
        <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          {/* Image Section */}
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Register background"
              src={registerPageImg}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
          </section>

          {/* Form Section */}
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Register Your Account 🦑
              </h1>

              <form onSubmit={handleSubmit(submitEvent)} className="mt-8 grid grid-cols-6 gap-6">
                {/* Full Name */}
                <div className="col-span-6">
                  <InputLabelComponent htmlFor="fullName" label="Name" />
                  <TextInputComponent
                    errorMsg={errors?.fullName?.message}
                    control={control}
                    name="fullName"
                    placeholder="Enter your Name"
                    register={register}
                  />
                </div>

                {/* Email */}
                <div className="col-span-6">
                  <InputLabelComponent htmlFor="email" label="Email" />
                  <TextInputComponent
                    errorMsg={errors?.email?.message}
                    control={control}
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    register={register}
                  />
                </div>

                {/* Password */}
                <div className="col-span-6 sm:col-span-3">
                  <InputLabelComponent htmlFor="password" label="Password" />
                  <PasswordInputComponent
                    errorMsg={errors?.password?.message}
                    control={control}
                    name="password"
                    placeholder="Create Password"
                    showPasswordField
                  />
                </div>

                {/* Confirm Password */}
                <div className="col-span-6 sm:col-span-3">
                  <InputLabelComponent htmlFor="passwordConfirmation" label="Confirm Password" />
                  <PasswordInputComponent
                    errorMsg={errors?.passwordConfirmation?.message}
                    control={control}
                    name="passwordConfirmation"
                    placeholder="Confirm Password"
                    register={register}
                    showPasswordField
                  />
                </div>

                {/* Role */}
                <div className="col-span-6">
                  <InputLabelComponent htmlFor="role" label="Role" />
                  <SelectOptionComponent
                    control={control}
                    name="role"
                    errorMsg={errors?.role?.message}
                    options={[
                      { label: "---Select any one---", value: "", disabled: true },
                      { label: "Customer", value: "customer" },
                      { label: "Seller", value: "seller" },
                    ]}
                  />
                </div>

                {/* Gender */}
                    <div className="col-span-6">
                                    <InputLabelComponent htmlFor="gender" label="Gender" className="mb-2" />
                                    <RadioInputComponent className="flex gap-6"
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

                {/* Phone */}
                <div className="col-span-6">
                  <InputLabelComponent htmlFor="phone" label="Phone Number" />
                  <TextInputComponent
                    errorMsg={errors?.phone?.message}
                    control={control}
                    name="phone"
                    placeholder="Enter your Phone number"
                    register={register}
                  />
                </div>

                {/* Address */}
                <div className="col-span-6">
                  <InputLabelComponent htmlFor="address" label="Address" />
                  <TextAreaComponent
                    errorMsg={errors?.address?.message}
                    control={control}
                    name="address"
                    placeholder="Enter your Address"
                    register={register}
                  />
                </div>

                {/* Image */}
                <div className="col-span-6">
                  <InputLabelComponent htmlFor="image" label="Upload your Image" />
                  <ImageUploader setImage={setImage} errorMsg={errors?.image?.message} />
                </div>

                {/* Privacy */}
                <div className="col-span-6">
                  <div className="flex items-center">
                    <input type="checkbox" required className="h-4 w-4 text-[#213245] focus:ring-[#1f2937] border-gray-300" />
                    <span className="ml-2 text-sm">
                      I agree to the{" "}
                      <NavLink to="/privacy-policy" className="text-blue-500 hover:underline">
                        Privacy Policy
                      </NavLink>{" "}
                      and{" "}
                      <NavLink to="/terms-of-service" className="text-blue-500 hover:underline">
                        Terms of Service
                      </NavLink>.
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <div className="col-span-6 flex justify-end">
                  <FormActionButton submitLabel="Register" disableBtn={loading} />
                </div>
              </form>

              <div className="col-span-6 text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <NavLink to="/login" className="text-blue-500 hover:underline">
                    Sign in
                  </NavLink>
                </p>
              </div>
            </div>
          </main>
        </div>
      </section>
        </>
      }

      {/* OTP Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="text-center text-2xl font-semibold text-gray-800">
          Activate Your Account!
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="mb-5">
            <label htmlFor="otp" className="text-sm italic text-gray-500 mb-3 block">
              Enter the OTP you received in your email
            </label>
            <div className="flex justify-center">
              <input
                type="text"
                name="otp"
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
                className="w-full max-w-xs p-4 border-4 border-gray-300 rounded-lg text-xl text-gray-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="Enter Your OTP Code"
                maxLength={6}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-4">
          <Button
            disabled={modalLoading}
            onClick={activateUser}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-lg disabled:opacity-50"
          >
            {modalLoading ? <FontAwesomeIcon icon={faSpinner} spin className="text-white mr-3" /> : "Activate Now!"}
          </Button>
          <Button
            disabled={modalLoading}
            type="reset"
            className="px-6 py-2 bg-red-600 hover:!bg-red-800 text-white font-semibold rounded-md shadow-lg disabled:opacity-50"
            onClick={() => setOpenModal(false)}
          >
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterPage;
