import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { FaUserEdit, FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import userSvc from "./user.service";
import { toast } from "react-toastify";

const EditUserById = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [updating, setUpdating] = useState(false);

  // ================= FETCH USER =================
  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await userSvc.getUserById(id);
      console.log("USER:", res);

      const data = res?.detail || res?.data?.detail || res?.data;

      setUser(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  // ================= UPDATE USER =================
  const handleSubmit = async (values) => {
    try {
      setUpdating(true);

      const formData = new FormData();

      // ❌ IMPORTANT: REMOVE EMAIL BEFORE SENDING
      const { email, image, ...payload } = values;

      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }

      await userSvc.updateUser(id, formData);

      toast.success("User updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-teal-600" />
      </div>
    );
  }

  // ================= UI =================
  return (
    <section className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-3">
        <FaUserEdit className="text-teal-600 text-3xl" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Edit User
          </h1>
          <p className="text-sm text-gray-500">
            Update user details (email cannot be changed)
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border">

        <Formik
          enableReinitialize
          initialValues={{
            name: user?.name || "",
            email: user?.email || "",
            role: user?.role || "",
            gender: user?.gender || "",
            phone: user?.phone || "",
            address: user?.address || "",
            image: null,
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* NAME */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <Field
                  name="name"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {/* EMAIL (READ ONLY) */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email (Not Editable)
                </label>
                <Field
                  name="email"
                  disabled
                  className="w-full mt-1 px-4 py-2 border rounded-xl bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* ROLE */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500"
                >
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="customer">Customer</option>
                </Field>
              </div>

              {/* GENDER */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Phone
                </label>
                <Field
                  name="phone"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* ADDRESS */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Address
                </label>
                <Field
                  name="address"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* IMAGE */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Profile Image
                </label>

                <input
                  type="file"
                  className="mt-2 w-full border p-3 rounded-xl"
                  onChange={(e) =>
                    setFieldValue("image", e.target.files[0])
                  }
                />
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition
                  ${
                    updating
                      ? "bg-teal-700 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  {updating ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update User"
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

export default EditUserById;