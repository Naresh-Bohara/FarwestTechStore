import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllowedBy from "./rbac.config";

import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import PageNotFound from "../pages/errors/PageNotFound";

import HomeLayoutPage from "../pages/layouts/HomeLayoutPage";
import UserLayoutPage from "../pages/layouts/UserLayoutPage";
import AdminDashboardPage from "../pages/dashboard/AdminDashboardPage";
import AboutUsPage from "../pages/about-us/AboutUsPage";
import HomePage from "../pages/HomePage";

import BannerListPage from "../pages/banner/BannerListPage";
import AddBannerPage from "../pages/banner/AddBannerPage";
import EditBannerPage from "../pages/banner/EditBannerPage";

import BrandListPage from "../pages/brand/BrandListPage";
import EditBrandPage from "../pages/brand/EditBrandPage";
import AddBrandPage from "../pages/brand/AddBrandPage";

import ContactPage from "../pages/ContactPage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/order/OrderPage";

// import BrandDetailPage from "../pages/brand/BrandDetailPage"
import SellerPage from "../pages/seller/SellerPage";
import CustomerPage from "../pages/customer/CustomerPage";
import CategoriesPage from "../pages/categoryyy/CategoriesPage";
import AllProducts from "../pages/producttt/AllProducts";
import ProductDetailsPage from "../pages/producttt/ProductDetailsPage";
import CategoryDetailPage from "../pages/categoryyy/CategoryDetailPage";

import ProfilePage from "../ProfilePage";
import CategoryListPage from "../pages/category/categoryListPage";
import AddCategoryPage from "../pages/category/AddCategoryPage";
import ProductListPage from "../pages/product/ProductListPage";
import EditProductById from "../pages/product/EditProductById"
import AddProductPage from "../pages/product/AddProductPage";
import UserListPage from "../pages/user/UserListPage";
import AddUser from "../pages/user/AddUser";
import EditUserById from "../pages/user/EditUserById";
import ThemeContext from "../components/context/ThemeContext";
import { Flowbite } from "flowbite-react";
import AuthProvider from "../components/context/AuthContext";
import {Provider} from "react-redux"
import store from "./store.config";
import EditCategoryById from "../pages/category/EditCategoryById";

const RouterConfigComponent = () => {
  const [theme, setTheme] = useState("light");
  return (
    <>
    <Provider store={store}>
      <Flowbite theme={{mode: "light"}}>
        <AuthProvider>
          <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
            <ToastContainer theme="colored" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomeLayoutPage />}>
                  <Route index element={<HomePage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="sign-up" element={<RegisterPage />} />
                  <Route path="about-us" element={<AboutUsPage />} />
                  <Route path="contact" element={<ContactPage />} />

                  <Route path="me" element={<ProfilePage />} />
                  <Route path="customer" element={<CustomerPage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="all-products" element={<AllProducts />} />
                  <Route
                    path="product-detail/:id"
                    element={<ProductDetailsPage />}
                  />
                  <Route path="cart" element={<CartPage />} />
                  <Route
                    path="forget-password"
                    element={<ForgetPasswordPage />}
                  />
                  <Route
                    path="reset-password"
                    element={<ResetPasswordPage />}
                  />
                  <Route path="category/:id" element={<CategoryDetailPage />} />
                  {/* <Route path='brand/:id' element={<BrandDetailPage/>} /> */}

                  <Route path="*" element={<PageNotFound redirect="/" />} />
                </Route>

                <Route
                  path="/admin"
                  element={
                    <AllowedBy
                      role={["admin"]}
                      component={<UserLayoutPage />}
                    ></AllowedBy>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />

                  <Route path="banners" element={<BannerListPage />} />
                  <Route path="banners/create" element={<AddBannerPage />} />
                  <Route path="banners/edit/:id" element={<EditBannerPage />} />

                  <Route path="categories" element={<CategoryListPage />} />
                  <Route path="categories/create" element={<AddCategoryPage />} />
                  <Route path="categories/edit/:id" element={<EditCategoryById />}/>

                  <Route path="brands" element={<BrandListPage />} />
                  <Route path="brands/create" element={<AddBrandPage />} />
                  <Route path="brands/edit/:id" element={<EditBrandPage />} />

                  <Route path="products" element={<ProductListPage />} />
                  <Route path="products/create" element={<AddProductPage />} />
                  <Route path="products/edit/:id" element={<EditProductById />} />

                  <Route path="users" element={<UserListPage />} />
                  <Route path="users/create" element={<AddUser />} />
                  <Route path="users/edit/:id" element={<EditUserById />} />

                  <Route path="orders" element={<OrderPage />} />
                  <Route
                    path="*"
                    element={<PageNotFound redirect="/admin" />}
                  />
                </Route>

                <Route
                  path="/seller"
                  element={
                    <AllowedBy
                      role={["seller"]}
                      component={<UserLayoutPage />}
                    ></AllowedBy>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeContext.Provider>
        </AuthProvider>
      </Flowbite>
      </Provider>
    </>
  );
};

export default RouterConfigComponent;
