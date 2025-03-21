import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import categorySvc from "../../pages/category/category.service";

const HomeCategoryGrid = () => {
  const [categoryList, setCategoryList] = useState();

  const listForHome = useCallback(async () => {
    try {
      const response = await categorySvc.getForHomePage();
      setCategoryList(response.data);
    } catch (exception) {
      console.log(exception);
    }
  }, []);

  useEffect(() => {
    listForHome();
  }, [listForHome]);

  return (
    <>
      {categoryList && categoryList.length > 0 && (
        <section className="bg-[#E5F5F7] mt-4 py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mb-6 flex items-center justify-between border-b-2 border-b-[#B2DFDB]">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">
                Categories
              </h2>
            </div>
            {/* Responsive Grid for Small Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {categoryList &&
                categoryList.map((category, index) => (
                  <div
                    key={index}
                    className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <NavLink
                      to={`/category/${category.slug}`}
                      className="block p-4 rounded-lg hover:bg-[#E0F2F1] dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      {/* Image Styling */}
                      <img
                        className="w-full h-32 object-cover rounded-lg"
                        src={category.image}
                        alt={category.title}
                      />
                      <div className="p-2">
                        <h5 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          {category.title}
                        </h5>
                      </div>
                    </NavLink>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HomeCategoryGrid;
