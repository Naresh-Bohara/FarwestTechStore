import React, { useContext, useEffect, useState } from "react";
import loginPageImg from "../../assets/images/loginimg-2.jpg";
import { useForm } from "react-hook-form";
import { TextInputComponent, InputLabelComponent, PasswordInputComponent } from "../../components/form/InputComponent";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import authSvc from "./auth.service";
import { setErrorInfo } from "../../utilities/helpers";
import { FormActionButton } from "../../components/button/form-action-btn.component";
import { toast } from "react-toastify";
import { AuthContext } from "../../components/context/AuthContext";

// Validation schema for login
const loginDTO = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
});

const LoginPage = () => {
  const auth = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors }, register, setError } = useForm({
    resolver: yupResolver(loginDTO),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  // Login Action for login
  const loginAction = async (credentials) => {
    setLoading(true);
    try {
      const response = await authSvc.loginUser(credentials)
      // storage client ===> localStorage, sessionStorage, cookie
      // document.cookie = "name=value;expires=dateandtime;path='';http=''"
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refresh', response.data.refreshToken)
      // localStorage.setItem('user', JSON.stringify(response.data.detail))
      // sessionStorage.setItem()
      auth.setAuth({
        loggedInUser: response.data.detail
      })

      toast.success(`Welcome to ${response.data.detail.role} Panel!`)
      navigate("/"+response.data.detail.role)
    
    } catch (exception) {
      setErrorInfo(exception, setError);

    } finally {
      setLoading(false);
    }
  };

  const checkLogin = ()=>{
    try{
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user"))

      if(token && user){
        toast.info("You are already loggedin.")
        navigate("/"+user.role)
      }

    }catch(exception){
      setErrorInfo(exception)
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem("token") || null;
    if(token){
      checkLogin()
    }
  }, [])

  console.log("authContext", auth)

  return (
    <>
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

              <form onSubmit={handleSubmit(loginAction)} className="mt-8 grid grid-cols-6 gap-6">
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
                  <FormActionButton submitLabel={loading ?  "Logging in..." : "Login"} />
                </div>
              </form>

              {/* Forgot Password */}
              <div className="col-span-6 text-center mt-4">
                <NavLink to="/forget-password" className="text-sm text-blue-500 hover:underline">
                  Forgot your password?
                </NavLink>
              </div>

              {/* Don't have an account? Sign up */}
              <div className="col-span-6 text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <NavLink to="/sign-up" className="text-blue-500 hover:underline">
                    Sign up
                  </NavLink>
                </p>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
