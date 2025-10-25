import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import productSvc from "../product/product.service";

const CategoryDetailPage = () => {
  const { id: categorySlug } = useParams(); 
  const [query] = useSearchParams();
  const searchQuery = query.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productSvc.getProductBySlug(categorySlug);
        let data = response.data || [];
        console.log(data)

        if (searchQuery) {
          data = data.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, searchQuery]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        Category: <span className="capitalize">{categorySlug.replace("-", " ")}</span>
      </h2>

      {searchQuery && (
        <h3 className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Search Results for: <span className="font-medium">{searchQuery}</span>
        </h3>
      )}

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-6">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              productUrl={product.imageUrl}
              productName={product.name}
              productPrice={product.price}
              productRating={product.rating || 4}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 text-center mt-6">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default CategoryDetailPage;
