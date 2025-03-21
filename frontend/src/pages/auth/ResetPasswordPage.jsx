import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import resetPasswordImage from '../../assets/images/forget2.png'; // Update with the correct image path

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number'),
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      // Here you would typically send the new password to your backend for processing
      alert('Your password has been successfully reset.'); // For demonstration
    },
  });

  return (
    <section className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="flex items-center justify-center md:w-1/2">
        <img src={resetPasswordImage} alt="Reset Password" className="w-3/4 h-[80vh] rounded-md" />
      </div>
      <div className="md:w-1/2 p-6">
        <h1 className="text-2xl font-bold text-teal-950 mb-4">Reset Password</h1>
        <form onSubmit={formik.handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password:
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
