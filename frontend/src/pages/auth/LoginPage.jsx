import React, { useContext, useEffect, useState } from "react";
import loginPageImg from "../../assets/images/loginimg-2.jpg";
import { useForm } from "react-hook-form";
import {
  TextInputComponent,
  InputLabelComponent,
  PasswordInputComponent,
} from "../../components/form/InputComponent";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import authSvc from "./auth.service";
import { setErrorInfo } from "../../utilities/helpers";
import { FormActionButton } from "../../components/button/form-action-btn.component";
import { toast } from "react-toastify";
import { AuthContext } from "../../components/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { getMyCartItems } from "../../stores/cart.store";

// ======================== Validation Schema ========================
const loginDTO = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// ======================== Component ========================
const LoginPage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); // login submit
  const [checkingAuth, setCheckingAuth] = useState(true); // check if already logged in

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useForm({
    resolver: yupResolver(loginDTO),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ======================== Check Login ========================
  useEffect(() => {
    const checkUser = () => {
      try {
        const token = localStorage.getItem("token");
        const userInfo = JSON.parse(localStorage.getItem("user"));
        if ((auth?.loggedInUser || userInfo) && token) {
          toast.info("You are already logged in.");
          navigate(`/${(auth?.loggedInUser || userInfo).role}`);
        }
      } catch (err) {
        setErrorInfo(err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkUser();
  }, [auth, navigate]);

  // ======================== Login Action ========================
  const loginAction = async (credentials) => {
    setLoading(true);
    try {
      const response = await authSvc.loginUser(credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refresh", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.detail));

      setAuth({ loggedInUser: response.data.detail });

      // ✅ Fetch user's cart after login
      dispatch(getMyCartItems());

      toast.success(`Welcome back, ${response.data.detail.name || "User"}!`);

      if (query.get("redirectTo")) {
        navigate(query.get("redirectTo"));
      } else {
        navigate(`/${response.data.detail.role}`);
      }
    } catch (exception) {
      setErrorInfo(exception, setError);
    } finally {
      setLoading(false);
    }
  };

  // ======================== Loading Screen ========================
  if (checkingAuth || loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-cyan-600" />
      </div>
    );
  }

  // ======================== Render ========================
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Image Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Login background"
            src={loginPageImg}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </section>

        {/* Form Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Login to Your Account
            </h1>

            <form
              onSubmit={handleSubmit(loginAction)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
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
              <div className="col-span-6">
                <InputLabelComponent htmlFor="password" label="Password" />
                <PasswordInputComponent
                  errorMsg={errors?.password?.message}
                  control={control}
                  name="password"
                  placeholder="Enter Password"
                  showPasswordField={true}
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-6 flex justify-end">
                <FormActionButton
                  submitLabel={loading ? "Logging in..." : "Login"}
                  disableBtn={loading}
                />
              </div>
            </form>

            {/* Forgot Password */}
            <div className="col-span-6 text-center mt-4">
              <NavLink
                to="/forget-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot your password?
              </NavLink>
            </div>

            {/* Sign Up */}
            <div className="col-span-6 text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <NavLink
                  to="/sign-up"
                  className="text-blue-500 hover:underline"
                >
                  Sign up
                </NavLink>
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginPage;
