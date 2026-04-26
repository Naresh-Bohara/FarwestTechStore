import React, { useContext } from 'react';
import HomeBanner from '../components/banner/HomeBanner'; 
import HomeBrandList from '../components/brand/HomeBrandComponent';
import ThemeContext from '../components/context/ThemeContext';
import HomeCategoryGrid from '../components/category/HomeCategoryGrid';
import HomePageProductList from '../components/product/HomePageProductList';
import { FaWhatsapp } from 'react-icons/fa';

const HomePage = () => {
  const themevalue = useContext(ThemeContext)
  const phoneNumber = "9864755254"; // Your WhatsApp number
  const whatsappMessage = "Hello, I need help with Farwest Tech Store.";

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <HomeBanner />

      <HomeBrandList/>

      <HomeCategoryGrid/>

      <HomePageProductList/>

      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-32 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-8 w-8" />
      </button>
    </>
  );
};

export default HomePage;