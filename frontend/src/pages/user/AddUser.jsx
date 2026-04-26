import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import userSvc from "./user.service";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa";

const AddUser = () => {
  const [loading, setLoading] = useState(false);

  const inputStyle =
    "w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-sm";

  const textAreaStyle =
    "w-full mt-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-sm resize-none";

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    gender: "",
    phone: "",
    address: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    role: Yup.string().required("Role is required"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      const { confirmPassword, ...payload } = values;

      Object.keys(payload).forEach((key) => {
        if (key !== "image") {
          formData.append(key, payload[key]);
        }
      });

      if (payload.image) {
        formData.append("image", payload.image);
      }

      await userSvc.createUser(formData);

      toast.success("User created successfully!");
      resetForm();

    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6 flex items-center gap-3">
        <FaUserPlus className="text-teal-600 text-3xl" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Add New User
          </h1>
          <p className="text-gray-500 text-sm">
            Create and manage users from admin dashboard
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <Field name="name" className={inputStyle} />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <Field name="email" className={inputStyle} />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Field type="password" name="password" className={inputStyle} />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* CONFIRM */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <Field type="password" name="confirmPassword" className={inputStyle} />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* ROLE */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Role</label>
                <Field as="select" name="role" className={inputStyle}>
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </Field>
              </div>

              {/* GENDER */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Gender</label>
                <Field as="select" name="gender" className={inputStyle}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Phone</label>
                <Field name="phone" className={inputStyle} />
              </div>

              {/* ADDRESS */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Address</label>
                <Field as="textarea" rows="3" name="address" className={textAreaStyle} />
                <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* IMAGE */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Profile Image</label>

                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    onChange={(e) => setFieldValue("image", e.target.files[0])}
                    disabled={loading}
                  />
                </div>

                <ErrorMessage name="image" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold shadow-md transition 
                  ${loading
                      ? "bg-teal-700 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700"
                    } text-white`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaUserPlus />
                      Create User
                    </>
                  )}
                </button>
              </div>

            </Form>
          )}
        </Formik>

      </div>
    </section>
  );
};

export default AddUser;