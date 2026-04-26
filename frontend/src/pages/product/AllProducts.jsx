import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { toast } from "react-toastify";
import productSvc from "./product.service";
import { FaSearch } from "react-icons/fa";

// ========== PageTitle Component (built-in) ==========
const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// ========== SearchField Component (built-in) ==========
const SearchField = ({ onSearch, defaultValue = '', placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-20 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

// ========== SortDropdown Component (built-in) ==========
const SortDropdown = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// ========== ProductGridSkeleton Component (built-in) ==========
const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ========== PaginationComponent (built-in) ==========
const PaginationComponent = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        Previous
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...' || page === currentPage}
          className={`px-4 py-2 rounded-lg transition-colors ${
            page === currentPage
              ? 'bg-teal-600 text-white'
              : page === '...'
              ? 'cursor-default'
              : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

// ========== Main AllProductsPage Component ==========
const AllProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalData: 0,
    limit: 12,
    currentPage: 1,
    totalPages: 1,
  });

  // Get params from URL
  const page = parseInt(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productSvc.getAllProducts({
        page,
        limit: 12,
        keyword: search,
        sort,
        category,
        brand
      });
      
      setProducts(response.data || []);
      setPagination({
        totalData: response.options?.total || 0,
        limit: response.options?.limit || 12,
        currentPage: response.options?.page || 1,
        totalPages: response.options?.totalPages || 1,
      });
    } catch (exception) {
      console.log(exception);
      toast.error("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, search, sort, category, brand]);

  const handleSearch = (searchTerm) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleSort = (sortValue) => {
    const params = new URLSearchParams(searchParams);
    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Page Title */}
        <PageTitle 
          title="All Products" 
          subtitle="Browse our complete collection of STEM and robotics products"
        />

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-96">
              <SearchField 
                onSearch={handleSearch}
                defaultValue={search}
                placeholder="Search products..."
              />
            </div>
            <div className="w-full md:w-48">
              <SortDropdown
                value={sort}
                onChange={handleSort}
                options={[
                  { label: "Latest", value: "" },
                  { label: "Price: Low to High", value: "price-low" },
                  { label: "Price: High to Low", value: "price-high" },
                  { label: "Name: A to Z", value: "name-asc" },
                  { label: "Name: Z to A", value: "name-desc" },
                  { label: "Top Rated", value: "rating" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <ProductGridSkeleton count={12} />
        ) : (
          <>
            {products && products.length > 0 ? (
              <>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8">
                    <PaginationComponent
                      pagination={pagination}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found.
                </p>
                {search && (
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Try searching with different keywords.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllProductsPage;