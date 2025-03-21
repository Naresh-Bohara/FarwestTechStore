import React from 'react';
import ProductCard from '../../components/ProductCard'; // Your existing ProductCard component

// Importing images
import product1 from "../../assets/images/product.jpg"; // Use actual images
import product2 from "../../assets/images/product.jpg";

const AllProductsPage = () => {
  // Sample product data
  const allProducts = [
    { id: 1, productUrl: product1, name: "RC2205 2300KV Brushless Motor", price: "Rs. 1305", rating: 4.8 },
    { id: 2, productUrl: product2, name: "High-Performance Racing Drone", price: "Rs. 1400", rating: 4.8 },
    { id: 3, productUrl: product1, name: "Latest RC2205 Motor", price: "Rs. 1350", rating: 4.5 },
    { id: 4, productUrl: product2, name: "Latest Racing Drone", price: "Rs. 1450", rating: 4.6 },
    { id: 5, productUrl: product1, name: "Best-Selling RC2205 Motor", price: "Rs. 1500", rating: 4.7 },
    { id: 6, productUrl: product2, name: "Top Racing Drone", price: "Rs. 1550", rating: 4.9 },
  ];

  return (
    <div className="container mx-auto px-4 mb-4">
      <main className="row">
        {/* All Products Section */}
        <h2 className="text-4xl font-bold text-center mt-6 mb-6 text-[#214f52]">All Products</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              productUrl={product.productUrl} 
              productName={product.name} 
              productPrice={product.price} 
              productRating={product.rating} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProductsPage;
