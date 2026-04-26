import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Flowbite } from "flowbite-react";
import { useDispatch } from "react-redux";

import AllowedBy from "./rbac.config";
import AuthProvider from "../components/context/AuthContext";
import ThemeContext from "../components/context/ThemeContext";
import { getMyCartItems } from "../stores/cart.store";

/* =========================
   LAYOUTS (EAGER)
========================= */
import HomeLayoutPage from "../pages/layouts/HomeLayoutPage";
import UserLayoutPage from "../pages/layouts/UserLayoutPage";

/* =========================
   ADMIN EAGER (IMPORTANT)
========================= */
import AdminOrderPage from "../pages/order/AdminOrderPage";
import OrderDetailPage from "../pages/order/OrderDetailPage";

/* =========================
   LOADER
========================= */
const PageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-screen gap-3">
    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
  </div>
);

/* =========================
   AUTH
========================= */
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/ForgetPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage"));

/* =========================
   PUBLIC PAGES
========================= */
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutUsPage = lazy(() => import("../pages/about-us/AboutUsPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const PageNotFound = lazy(() => import("../pages/errors/PageNotFound"));

const AllProducts = lazy(() => import("../pages/product/AllProducts"));
const ProductDetailPage = lazy(() => import("../pages/product/ProductDetailPage"));

const CategoriesPage = lazy(() => import("../pages/categoryyy/CategoriesPage"));
const CategoryDetailPage = lazy(() => import("../pages/category/CategoryDetailPage"));
const BrandDetailPage = lazy(() => import("../pages/brand/BrandDetailPage"));

const CartPage = lazy(() => import("../pages/cart/CartPage"));
const CheckoutPage = lazy(() => import("../pages/cart/CheckoutPage"));
const OrderPage = lazy(() => import("../pages/order/OrderPage"));
const ProfilePage = lazy(() => import("../ProfilePage"));

/* =========================
   ADMIN PAGES
========================= */
const AdminDashboardPage = lazy(() =>
  import("../pages/dashboard/AdminDashboardPage")
);

const BannerListPage = lazy(() => import("../pages/banner/BannerListPage"));
const AddBannerPage = lazy(() => import("../pages/banner/AddBannerPage"));
const EditBannerPage = lazy(() => import("../pages/banner/EditBannerPage"));

const BrandListPage = lazy(() => import("../pages/brand/BrandListPage"));
const AddBrandPage = lazy(() => import("../pages/brand/AddBrandPage"));
const EditBrandPage = lazy(() => import("../pages/brand/EditBrandPage"));

const CategoryListPage = lazy(() =>
  import("../pages/category/categoryListPage")
);
const AddCategoryPage = lazy(() => import("../pages/category/AddCategoryPage"));
const EditCategoryById = lazy(() =>
  import("../pages/category/EditCategoryById")
);

const ProductListPage = lazy(() => import("../pages/product/ProductListPage"));
const AddProductPage = lazy(() => import("../pages/product/AddProductPage"));
const EditProductPage = lazy(() => import("../pages/product/EditProductPage"));

const UserListPage = lazy(() => import("../pages/user/UserListPage"));
const AddUser = lazy(() => import("../pages/user/AddUser"));
const EditUserById = lazy(() => import("../pages/user/EditUserById"));

const ChatViewPage = lazy(() => import("../pages/chat/ChatViewPage"));

/* =========================
   MAIN ROUTER
========================= */
const RouterConfigComponent = () => {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getMyCartItems());
    }
  }, [dispatch]);

  return (
    <Flowbite theme={{ mode: "light" }}>
      <AuthProvider>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ToastContainer theme="colored" />

          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>

                {/* ================= PUBLIC ================= */}
                <Route path="/" element={<HomeLayoutPage />}>
                  <Route index element={<HomePage />} />

                  <Route path="login" element={<LoginPage />} />
                  <Route path="sign-up" element={<RegisterPage />} />
                  <Route path="forget-password" element={<ForgetPasswordPage />} />
                  <Route path="reset-password" element={<ResetPasswordPage />} />

                  <Route path="about-us" element={<AboutUsPage />} />
                  <Route path="contact" element={<ContactPage />} />

                  <Route path="me" element={<ProfilePage />} />

                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="category/:id" element={<CategoryDetailPage />} />
                  <Route path="category/:id/:cid" element={<CategoryDetailPage />} />

                  <Route path="products" element={<AllProducts />} />
                  <Route path="products/:slug" element={<ProductDetailPage />} />

                  <Route path="brand/:id" element={<BrandDetailPage />} />

                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="orders" element={<OrderPage />} />

                  <Route path="*" element={<PageNotFound redirect="/" />} />
                </Route>

                {/* ================= ADMIN ================= */}
                <Route
                  path="/admin"
                  element={
                    <AllowedBy role={["admin"]} component={<UserLayoutPage />} />
                  }
                >
                  <Route index element={<AdminDashboardPage />} />

                  {/* banners */}
                  <Route path="banners" element={<BannerListPage />} />
                  <Route path="banners/create" element={<AddBannerPage />} />
                  <Route path="banners/edit/:id" element={<EditBannerPage />} />

                  {/* categories */}
                  <Route path="categories" element={<CategoryListPage />} />
                  <Route path="categories/create" element={<AddCategoryPage />} />
                  <Route path="categories/edit/:id" element={<EditCategoryById />} />

                  {/* brands */}
                  <Route path="brands" element={<BrandListPage />} />
                  <Route path="brands/create" element={<AddBrandPage />} />
                  <Route path="brands/edit/:id" element={<EditBrandPage />} />

                  {/* products */}
                  <Route path="products" element={<ProductListPage />} />
                  <Route path="products/create" element={<AddProductPage />} />
                  <Route path="products/edit/:id" element={<EditProductPage />} />

                  {/* users */}
                  <Route path="users" element={<UserListPage />} />
                  <Route path="users/create" element={<AddUser />} />
                  <Route path="users/edit/:id" element={<EditUserById />} />

                  {/* orders */}
                  <Route path="orders" element={<AdminOrderPage />} />
                  <Route path="orders/:id" element={<OrderDetailPage />} />

                  <Route path="chat" element={<ChatViewPage />} />

                  <Route path="*" element={<PageNotFound redirect="/admin" />} />
                </Route>

                {/* ================= SELLER ================= */}
                <Route
                  path="/seller"
                  element={
                    <AllowedBy role={["seller"]} component={<UserLayoutPage />} />
                  }
                />

                {/* ================= CUSTOMER ================= */}
                <Route
                  path="/customer"
                  element={
                    <AllowedBy
                      role={["customer"]}
                      component={<UserLayoutPage />}
                    />
                  }
                >
                  <Route path="chat" element={<ChatViewPage />} />
                </Route>

              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeContext.Provider>
      </AuthProvider>
    </Flowbite>
  );
};

export default RouterConfigComponent;