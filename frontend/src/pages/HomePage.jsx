import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import HomeBanner from '../components/banner/HomeBanner'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faShippingFast, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

import product1 from "../assets/images/product2.jpg";
import product2 from "../assets/images/product2.jpg";
import customer1 from "../assets/images/avatar.png"; 
import customer2 from "../assets/images/avatar.png";
import HomeBrandList from '../components/brand/HomeBrandComponent';
import ThemeContext from '../components/context/ThemeContext';
import HomeCategoryGrid from '../components/category/HomeCategoryGrid';

// ReviewCard Component for Customer Reviews
const ReviewCard = ({ customer, review, name }) => (
  <div className="max-w-sm p-6 rounded-lg shadow-md border border-[#B0E0E6] bg-[#E0F7FA]">
    <img src={customer} alt={name} className="w-20 h-20 rounded-full mx-auto mb-4" />
    <p>"{review}" - <strong>{name}</strong></p>
  </div>
);

const HomePage = () => {
  // Sample product data
  const featuredProducts = [
    { id: 1, productUrl: product1, name: "RC2205 2300KV Brushless Motor ", price: "Rs. 1305", rating: 4.8 },
    { id: 2, productUrl: product1, name: "RC2205 2300KV Brushless Motor ", price: "Rs. 1305", rating: 4.8 },
    { id: 3, productUrl: product2, name: "High-Performance Racing Drone", price: "Rs. 1400", rating: 4.8 },
  ];

  const latestProducts = [
    { id: 4, productUrl: product1, name: "Latest RC2205 Motor", price: "Rs. 1350", rating: 4.5 },
    { id: 5, productUrl: product2, name: "Latest Racing Drone", price: "Rs. 1450", rating: 4.6 },
    { id: 6, productUrl: product2, name: "Latest Racing Drone", price: "Rs. 1450", rating: 4.6 },
  ];

  const topSellingProducts = [
    { id: 7, productUrl: product1, name: "Best-Selling RC2205 Motor", price: "Rs. 1500", rating: 4.7 },
    { id: 8, productUrl: product2, name: "Top Racing Drone", price: "Rs. 1550", rating: 4.9 },
  ];

  const themevalue = useContext(ThemeContext)
  // console.log(themevalue)

  return (
    <>
      <HomeBanner />

      <HomeBrandList/>

      <HomeCategoryGrid/>

      <div className="container mx-auto px-4 mb-4">
        <main className="row ">

          {/* Featured Products Section */}
          <ProductSection title="Featured Products" products={featuredProducts} />

          {/* Latest Products Section */}
          <ProductSection title="Latest Products" products={latestProducts} />

          {/* Top Selling Products Section */}
          <ProductSection title="Top Selling Products" products={topSellingProducts} />

          {/* Why Us Section */}
          <h2 className="text-4xl font-bold text-center my-10 text-[#214f52]">
            <span className="underline decoration-4 decoration-[#D5F5F6]">Why Us</span>
          </h2>
          <div className="flex justify-around items-center gap-10 bg-[#D5F5F6] p-8 rounded-lg shadow-lg">
            <div className="flex flex-col items-center text-center">
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-5xl text-[#213245] mb-4" />
              <div className="text-xl font-semibold text-[#213245]">Best Price</div>
              <p className="text-gray-700">Competitive prices for all our products.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FontAwesomeIcon icon={faShippingFast} className="text-5xl text-[#213245] mb-4" />
              <div className="text-xl font-semibold text-[#213245]">Fast Delivery</div>
              <p className="text-gray-700">Quick shipping to ensure you get your items on time.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FontAwesomeIcon icon={faShieldAlt} className="text-5xl text-[#213245] mb-4" />
              <div className="text-xl font-semibold text-[#213245]">Genuine Products</div>
              <p className="text-gray-700">All products are thoroughly tested for quality assurance.</p>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <h2 className="text-4xl font-bold text-center my-10 text-[#214f52]">
            <span className="underline decoration-4 decoration-[#D5F5F6]">Customer Reviews</span>
          </h2>
          <div className="flex flex-wrap justify-center items-start gap-10">
            <ReviewCard customer={customer1} review="Great products and fast delivery! Highly recommend." name="Naresh Bohara" />
            <ReviewCard customer={customer2} review="Excellent customer service and genuine products!" name="Naresh Bohara" />
          </div>

        </main>
      </div>
    </>
  );
};


const ProductSection = ({ title, products }) => (
  <div className="col-12 my-8">
    <h2 className="text-[30px] font-bold text-center mb-8 text-[#214f52]">{title}</h2>
    <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          productUrl={product.productUrl} 
          productName={product.name} 
          productPrice={product.price} 
          productRating={product.rating} 
        />
      ))}
    </div>
    <hr className="my-6 border-[#D5F5F6]" />
  </div>
);



export default HomePage;
