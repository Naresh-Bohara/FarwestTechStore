import React, { useContext } from 'react';
import HomeBanner from '../components/banner/HomeBanner'; 
import HomeBrandList from '../components/brand/HomeBrandComponent';
import ThemeContext from '../components/context/ThemeContext';
import HomeCategoryGrid from '../components/category/HomeCategoryGrid';
import HomePageProductList from '../components/product/HomePageProductList';

const HomePage = () => {

  const themevalue = useContext(ThemeContext)
  // console.log(themevalue)

  return (
    <>
      <HomeBanner />

      <HomeBrandList/>

      <HomeCategoryGrid/>

      <HomePageProductList/>
    
    </>
  );
};

export default HomePage;
