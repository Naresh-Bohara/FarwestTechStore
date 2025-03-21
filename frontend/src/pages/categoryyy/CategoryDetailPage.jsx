import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard'; // Import the ProductCard component
import product from "../../assets/images/product.jpg"

const products = [
  {
    id: 1,
    category: 'robotics-kits',
    name: 'RC2205 2300KV Brushless Motor',
    price: 'Rs. 1305',
    imageUrl: product, 
  },
  {
    id: 2,
    category: 'robotics-kits',
    name: 'RC2205 2300KV Brushless Motor',
    price: 'Rs. 1305',
    imageUrl: 'https://m.media-amazon.com/images/I/81KhuUWwtwL.jpg', 
  },
  {
    id: 3,
    category: 'rcmotors',
    name: 'RC Motor XYZ',
    price: 'Rs. 1500',
    imageUrl: 'https://m.media-amazon.com/images/I/51hxzBAdOfL._SL1000_.jpg',
  },
  {
    id: 4,
    category: 'drones-uavs',
    name: 'Drone ABC',
    price: 'Rs. 2500',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJaB4JyeOxD_WBTgVz_4zmGQycrp2eViRhjw&s',
  },
  {
    id: 5,
    category: 'microcontrollers-boards',
    name: 'Microcontroller 123',
    price: 'Rs. 800',
    imageUrl: 'https://robonepal.com/wp-content/uploads/2024/06/1-19-1.jpg', 
  },
];

const CategoryDetailPage = () => {
  const params = useParams();
  const [query] = useSearchParams();
  
  // Filter products based on the category id
  const filteredProducts = products.filter(product => 
    product.category.toLowerCase() === params.id.toLowerCase()
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        This is the category details page of "{params.id}". 
      </h2>
      <h3 className="text-lg mb-2">Search Query: {query.get("search")}</h3>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={product.id}>
              <ProductCard 
                productUrl={product.imageUrl} 
                productName={product.name} 
                productPrice={product.price} 
                productRating={4}
              />
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailPage;
