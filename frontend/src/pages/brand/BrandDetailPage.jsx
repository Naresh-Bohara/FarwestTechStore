import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import brandSvc from "./brand.service";

const BrandDetailPage = () => {
  const { id: brandSlug } = useParams(); 
  const [query] = useSearchParams();
  const searchQuery = query.get("search") || "";

  const [brandData, setBrandData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBrandProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await brandSvc.getRequest(`/brand/${brandSlug}/by-slug`, {
          params: {
            page: page,
            limit: 12,
            ...(searchQuery && { keyword: searchQuery })
          }
        });
        
        setBrandData(response.data?.detail || null);
        setProducts(response.data?.products || []);
        
        // If pagination info is returned
        if (response.options) {
          setTotalPages(Math.ceil(response.options.totalCount / 12));
        }
      } catch (err) {
        console.error("Failed to fetch brand products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (brandSlug) {
      fetchBrandProducts();
    }
  }, [brandSlug, searchQuery, page]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Brand Header */}
      {brandData && (
        <div className="relative h-64 md:h-80 w-full">
          <img 
            src={brandData.image} 
            alt={brandData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {brandData.title}
              </h1>
              {brandData.description && (
                <p className="text-lg max-w-2xl px-4">
                  {brandData.description.replace(/<[^>]*>/g, '')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products in this brand..."
            className="w-full md:w-96 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            defaultValue={searchQuery}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const params = new URLSearchParams(window.location.search);
                params.set('search', e.target.value);
                window.location.search = params.toString();
              }
            }}
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            {error}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            No products found for this brand.
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDetailPage;