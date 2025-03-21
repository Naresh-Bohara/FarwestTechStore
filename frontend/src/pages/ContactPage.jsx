import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ContactPage = () => {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitEvent = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container mx-auto px-4 mb-8">
      <h2 className="text-4xl font-bold text-center my-10 text-[#214f52]">
        Contact Us
      </h2>
      <p className="text-center text-gray-700 mb-8">
        We're here to help! If you have any questions or need assistance, feel
        free to reach out to us.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-start gap-10">
        {/* Contact Information */}
        <div className="w-full md:w-1/2 bg-[#D5F5F6] p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-[#213245] mb-4">
            Contact Information
          </h3>
          <p className="text-gray-700 mb-2">
            Email:{" "}
            <a href="mailto:support@farwesttech.com" className="text-teal-600">
              support@farwesttech.com
            </a>
          </p>
          <p className="text-gray-700 mb-2">
            Phone:{" "}
            <a href="tel:+977-9840770641" className="text-teal-600">
              +977- 9840770641
            </a>
          </p>
          <p className="text-gray-700 mb-4">Address: Kailali, Nepal</p>

          {/* Social Links */}
          <h3 className="text-lg font-semibold text-[#213245] mb-2">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-2xl text-[#213245] transition duration-300 hover:text-teal-300"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-2xl text-[#213245] transition duration-300 hover:text-teal-300"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-2xl text-[#213245] transition duration-300 hover:text-teal-300"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-2xl text-[#213245] transition duration-300 hover:text-teal-300"
              />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(submitEvent)}
          className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2"
        >
          <h3 className="text-2xl font-semibold text-[#213245] mb-4">
            Get in Touch
          </h3>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-[#D5F5F6] transition duration-300 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Your Name"
              style={{ borderRadius: "10px" }}
              {...control.register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-[#D5F5F6] transition duration-300 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Your Email"
              style={{ borderRadius: "10px" }}
              {...control.register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              className={`border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-[#D5F5F6] transition duration-300 ${
                errors.message ? "border-red-500" : ""
              }`}
              placeholder="Your Message"
              rows="4"
              style={{ borderRadius: "10px", resize: "none" }}
              {...control.register("message")}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#213245] text-white font-bold py-2 rounded-md hover:bg-[#D5F5F6] hover:text-[#213245] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
