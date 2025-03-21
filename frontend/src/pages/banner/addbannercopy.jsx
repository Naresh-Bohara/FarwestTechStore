import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AddBannerPage = () => {
  // Formik and Yup Validation Schema
  const formik = useFormik({
    initialValues: {
      title: '',
      image: null,
      status: 'active',
      link: '',
      fromDate: '',
      toDate: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, 'Title must be 50 characters or less')
        .required('Title is required'),
      image: Yup.mixed().required('Image is required'),
      link: Yup.string()
        .url('Invalid URL')
        .required('Link is required'),
      fromDate: Yup.date().required('Start date is required'),
      toDate: Yup.date().required('End date is required'),
    }),
    onSubmit: (values) => {
      console.log('Form data', values);
      // Handle banner submission (send to backend)
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-10 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-teal-700 text-center mb-8">Add New Banner</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Title Field */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
              Banner Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={`w-full p-3 border ${
                formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder="Enter banner title"
              {...formik.getFieldProps('title')}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>

          {/* Image Field */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
              Banner Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className={`w-full p-3 border ${
                formik.touched.image && formik.errors.image ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files[0]);
              }}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
            )}
          </div>

          {/* Status Field */}
          <div className="mb-6">
            <label htmlFor="status" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
              Banner Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...formik.getFieldProps('status')}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Link Field */}
          <div className="mb-6">
            <label htmlFor="link" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
              Banner Link
            </label>
            <input
              id="link"
              name="link"
              type="url"
              className={`w-full p-3 border ${
                formik.touched.link && formik.errors.link ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder="https://example.com"
              {...formik.getFieldProps('link')}
            />
            {formik.touched.link && formik.errors.link && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.link}</p>
            )}
          </div>

          {/* Date Range Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="fromDate" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
                Start Date
              </label>
              <input
                id="fromDate"
                name="fromDate"
                type="date"
                className={`w-full p-3 border ${
                  formik.touched.fromDate && formik.errors.fromDate ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                {...formik.getFieldProps('fromDate')}
              />
              {formik.touched.fromDate && formik.errors.fromDate && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.fromDate}</p>
              )}
            </div>
            <div>
              <label htmlFor="toDate" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">
                End Date
              </label>
              <input
                id="toDate"
                name="toDate"
                type="date"
                className={`w-full p-3 border ${
                  formik.touched.toDate && formik.errors.toDate ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                {...formik.getFieldProps('toDate')}
              />
              {formik.touched.toDate && formik.errors.toDate && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.toDate}</p>
              )}
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-between items-center mt-6">
            <NavLink
              to="/admin/banner"
              className="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              <FaTimes className="mr-2" />
              Cancel
            </NavLink>
            <button
              type="submit"
              className="flex items-center justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
            >
              <FaSave className="mr-2" />
              Save Banner
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddBannerPage;
