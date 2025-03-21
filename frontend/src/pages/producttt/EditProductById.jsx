import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const EditProductById = () => {
  const { id } = useParams(); // Getting product ID from URL
  const [initialValues, setInitialValues] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    featured: false,
  });

  useEffect(() => {
    // Fetch the product data based on ID (replace with your own API call)
    fetchProductById(id);
  }, [id]);

  const fetchProductById = async (id) => {
    // Mock API request (replace this with actual API request)
    const fetchedProduct = {
      name: 'RC Brushless Motor',
      price: '120',
      category: 'Motors',
      stock: '30',
      description: 'A high-quality RC motor.',
      featured: true,
    };

    setInitialValues(fetchedProduct);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    category: Yup.string().required('Category is required'),
    stock: Yup.number().required('Stock is required').min(1, 'Stock must be at least 1'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = (values) => {
    // Perform update API call here (replace with your API logic)
    console.log('Updated Product Data:', values);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <h1 className="text-2xl font-bold text-teal-950 py-3 border-b-2 border-teal-700">
        Edit Product
      </h1>
      <div className="mx-auto my-3 px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  placeholder="Enter product name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <Field
                  type="number"
                  name="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  placeholder="Enter product price"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <Field
                  type="text"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  placeholder="Enter product category"
                />
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stock
                </label>
                <Field
                  type="number"
                  name="stock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  placeholder="Enter product stock"
                />
                <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  placeholder="Enter product description"
                  rows="4"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="flex items-center cursor-pointer">
                  <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
                  <Field type="checkbox" name="featured" className="sr-only" />
                  <div
                    className={`w-10 h-6 rounded-full shadow-inner ${
                      initialValues.featured ? 'bg-teal-600' : 'bg-gray-400'
                    }`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      initialValues.featured ? 'transform translate-x-full bg-teal-500' : ''
                    }`}
                  ></div>
                </label>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
              >
                Update Product
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default EditProductById;
