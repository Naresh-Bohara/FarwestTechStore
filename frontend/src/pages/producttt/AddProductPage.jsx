import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddProductPage = () => {
  const [images, setImages] = useState([]);
  const categories = ['Computers', 'Laptops', 'Smartphones', 'Tablets', 'Accessories'];

  const handleImageUpload = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setImages(files);
    setFieldValue('images', files);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    summary: Yup.string().required('Summary is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    discountedPrice: Yup.number().positive('Discounted price must be a positive number'),
    category: Yup.string().required('Category is required'),
    status: Yup.boolean(),
    featured: Yup.boolean(),
    images: Yup.mixed().required('At least one image is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form Submitted', values);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <h1 className="text-2xl font-bold text-teal-950 py-3 border-b-2 border-teal-700">
        Add Product
      </h1>
      <Formik
        initialValues={{
          name: '',
          description: '',
          summary: '',
          price: '',
          discountedPrice: '',
          category: '',
          status: false,
          featured: false,
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name
              </label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Summary
              </label>
              <Field
                as="textarea"
                name="summary"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
              <ErrorMessage name="summary" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price
              </label>
              <Field
                type="number"
                name="price"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Discounted Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Discounted Price
              </label>
              <Field
                type="number"
                name="discountedPrice"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
              <ErrorMessage name="discountedPrice" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Images
              </label>
              <input
                type="file"
                multiple
                onChange={(event) => handleImageUpload(event, setFieldValue)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
              <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <Field
                as="select"
                name="category"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Status Toggle */}
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 me-3">
                Status
              </label>
              <Field type="checkbox" name="status" className="sr-only" />
              <div className="relative inline-flex items-center cursor-pointer">
                <div
                  className={`w-10 h-6 bg-gray-400 rounded-full shadow-inner ${
                    values.status ? 'bg-teal-600' : ''
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                    values.status ? 'translate-x-full bg-teal-500' : ''
                  }`}
                ></div>
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 me-3">
                Featured
              </label>
              <Field type="checkbox" name="featured" className="sr-only" />
              <div className="relative inline-flex items-center cursor-pointer">
                <div
                  className={`w-10 h-6 bg-gray-400 rounded-full shadow-inner ${
                    values.featured ? 'bg-teal-600' : ''
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                    values.featured ? 'translate-x-full bg-teal-500' : ''
                  }`}
                ></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-3 w-32 bg-teal-700 text-white py-2 px-4 rounded-lg hover:bg-teal-800 transition duration-200 text-base font-semibold shadow-sm"
            >
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddProductPage;
