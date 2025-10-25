import React, { useCallback, useEffect, useState } from 'react'
import ProductGridList from './ProductGridList'
import productSvc from '../../pages/product/product.service';
import { NavLink } from 'react-router-dom';

const HomePageProductList = () => {
  const[listProduct, setListProduct] = useState();

  const loadProducts = useCallback(async() => {
    try{
      const response = await productSvc.getProductForHomePage();
      setListProduct(response.data); 
    }catch(exception){
      console.log("Failed to fetch product list", exception)
    }
  }, [])

  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <div>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

    <div className="mb-4  space-y-4 flex justify-center items-center bg-[#f1f5f9] sm:space-y-0 md:mb-8">
        <h2 className="py-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl">For You</h2>
    </div>
    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
     {
      listProduct && listProduct.map((row, index) => (
        <ProductGridList key={index} product={row}/>
      ))  
     }
    
    </div>
    <div className="w-full text-center">
      <NavLink to={"/products"} className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Show more</NavLink>
    </div>
  </div>

</section>
    </div>
  )
}

export default HomePageProductList
