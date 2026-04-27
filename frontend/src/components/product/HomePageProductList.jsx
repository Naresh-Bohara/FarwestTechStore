import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import productSvc from "../../pages/product/product.service";
import { NavLink } from "react-router-dom";

const HomePageProductList = () => {
  const [listProduct, setListProduct] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      const response = await productSvc.getProductForHomePage();
      setListProduct(response.data || []);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-screen-xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="mb-6 w-full">
  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
    For You
  </h2>

  <div className="mt-2 h-[1px] bg-teal-600 rounded-full"></div>
</div>

          <NavLink
            to="/products"
            className="text-sm text-teal-600 hover:underline"
          >
            View All →
          </NavLink>
        </div>

        {/* GRID */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listProduct.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomePageProductList;