import React, { useState } from "react";
import { FaEdit, FaCamera } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import avatar from "./assets/images/avatar.png";

// Validation Schema for Edit Profile
const profileValidationSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
});

// Validation Schema for Change Password
const passwordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [profileImage, setProfileImage] = useState(avatar);
  const [name, setName] = useState("Naresh Bohara");
  const [email, setEmail] = useState("naresh@example.com");
  const [phone, setPhone] = useState("+977-9841234567");
  const [purchaseHistory] = useState([
    { id: 1, product: "RC 2205 Brushless Motor", date: "2024-09-20", price: "Rs. 1450", status: "Delivered" },
    { id: 2, product: "Drone Kit X350", date: "2024-08-15", price: "Rs. 32000", status: "Shipped" },
    { id: 3, product: "Arduino Mega 2560", date: "2024-07-10", price: "Rs. 950", status: "Delivered" },
  ]);
  const [reviews] = useState([
    { id: 1, product: "RC 2205 Brushless Motor", rating: 5, review: "Great performance, improved flight stability." },
    { id: 2, product: "Arduino Mega 2560", rating: 4, review: "Good board for robotics projects." },
  ]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = (values) => {
    console.log("Profile updated:", values);
  };

  const handlePasswordChange = (values) => {
    console.log("Password updated:", values);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center space-x-6">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <label htmlFor="profileUpload" className="absolute bottom-0 right-0 bg-[#213245] p-2 rounded-full text-white cursor-pointer">
            <FaCamera />
            <input
              type="file"
              id="profileUpload"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#213245]">{name}</h1>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center md:justify-start space-x-4 border-b border-gray-300 pb-2">
        <button
          className={`pb-2 text-lg font-medium ${activeTab === "edit-profile" ? "text-[#213245] border-b-2 border-[#213245]" : "text-gray-500"}`}
          onClick={() => handleTabClick("edit-profile")}
        >
          Edit Profile
        </button>
        <button
          className={`pb-2 text-lg font-medium ${activeTab === "purchase-history" ? "text-[#213245] border-b-2 border-[#213245]" : "text-gray-500"}`}
          onClick={() => handleTabClick("purchase-history")}
        >
          Purchase History
        </button>
        <button
          className={`pb-2 text-lg font-medium ${activeTab === "my-reviews" ? "text-[#213245] border-b-2 border-[#213245]" : "text-gray-500"}`}
          onClick={() => handleTabClick("my-reviews")}
        >
          My Reviews
        </button>
        <button
          className={`pb-2 text-lg font-medium ${activeTab === "change-password" ? "text-[#213245] border-b-2 border-[#213245]" : "text-gray-500"}`}
          onClick={() => handleTabClick("change-password")}
        >
          Change Password
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "edit-profile" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#213245]">Edit Profile</h2>
            <Formik
              initialValues={{ name, email, phone }}
              validationSchema={profileValidationSchema}
              onSubmit={handleProfileUpdate}
            >
              {() => (
                <Form className="space-y-4 md:max-w-lg">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-600">Name</label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-600">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-gray-600">Phone</label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500" />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#213245] text-white py-2 rounded-md hover:bg-[#1b2731] transition duration-300"
                  >
                    Update Profile
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {activeTab === "purchase-history" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#213245]">Purchase History</h2>
            {purchaseHistory.length > 0 ? (
              <div className="space-y-4">
                {purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="flex justify-between bg-gray-100 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold">{purchase.product}</p>
                      <p className="text-gray-500">{purchase.date}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{purchase.price}</p>
                      <p className={`text-sm ${purchase.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>{purchase.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No purchase history available.</p>
            )}
          </div>
        )}

        {activeTab === "my-reviews" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#213245]">My Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-100 p-4 rounded-lg">
                    <p className="font-semibold">{review.product}</p>
                    <p className="text-yellow-500">{Array(review.rating).fill("⭐")}</p>
                    <p className="text-gray-600">{review.review}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews available.</p>
            )}
          </div>
        )}

        {activeTab === "change-password" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#213245]">Change Password</h2>
            <Formik
              initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
              validationSchema={passwordValidationSchema}
              onSubmit={handlePasswordChange}
            >
              {() => (
                <Form className="space-y-4 md:max-w-lg">
                  <div className="flex flex-col">
                    <label htmlFor="currentPassword" className="text-gray-600">Current Password</label>
                    <Field
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage name="currentPassword" component="div" className="text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="newPassword" className="text-gray-600">New Password</label>
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage name="newPassword" component="div" className="text-red-500" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="text-gray-600">Confirm Password</label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="border border-gray-300 rounded-md p-2"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#213245] text-white py-2 rounded-md hover:bg-[#1b2731] transition duration-300"
                  >
                    Update Password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
