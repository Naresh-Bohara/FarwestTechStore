import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import brandSvc from "../../pages/brand/brand.service";

const HomeBrandList = () => {
  const [brandList, setBrandList] = useState();
  const [loading, setLoading] = useState(true);

  const getAllBrands = useCallback(async () => {
    try {
      const response = await brandSvc.getForHomePage();
      setBrandList(response.data);
      setLoading(false);
    } catch (exception) {
      console.log("Exception", exception);
    }
  }, []);

  useEffect(() => {
    getAllBrands();
  }, [getAllBrands]);

  return (
    <>
      {loading ? (
        <div className="text-center py-16">
          <span className="text-gray-700 dark:text-gray-300">Loading...</span>
        </div>
      ) : (
        <section className="bg-[#F1F5F9] py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div className="mb-6 flex items-center justify-between border-b-2 border-b-[#D1D5DB]">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">
        Shop by Brand
      </h2>
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {brandList &&
        brandList.map((brand, index) => (
          <NavLink
            to={`/brand/${brand.slug}`}
            key={index}
            className="flex items-center rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-lg hover:bg-[#F0F4F8] dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
          >
            <img src={brand.image} className="me-2 h-8 shrink-0" alt={brand.title} />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {brand.title}
            </span>
          </NavLink>
        ))}
    </div>
  </div>
</section>


      )}
    </>
  );
};

export default HomeBrandList;
