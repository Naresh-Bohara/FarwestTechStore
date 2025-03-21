import React, { useState } from 'react';
import forgetPasswordImage from '../../assets/images/forget2.png'; // Update with the correct image path

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Here you would typically send the email to your backend for processing
    setMessage(`A password reset link has been sent to ${email}`);
    setError('');
  };

  return (
    <section className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="flex items-center justify-center md:w-1/2">
        <img src={forgetPasswordImage} alt="Forget Password" className="w-3/4 h-[80vh] rounded-md" />
      </div>
      <div className="md:w-1/2 p-6">
        <h1 className="text-2xl font-bold text-teal-950 mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your email address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          {message && <p className="text-green-500">{message}</p>}
          <button
            type="submit"
            className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
