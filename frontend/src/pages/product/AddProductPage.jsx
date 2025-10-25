import { useForm } from "react-hook-form";
import { AdminPageTitle } from "../../components/admin-page-layout/AdminPageTitle";
import {
  HtmlEditor,
  InputLabelComponent,
  SelectOptionComponent,
  TextInputComponent,
} from "../../components/form/InputComponent";
import * as Yup from "yup";
import { useCallback, useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormActionButton } from "../../components/button/form-action-btn.component";
import { setErrorInfo } from "../../utilities/helpers";
import { useNavigate } from "react-router-dom";
import productSvc from "./product.service";
import categorySvc from "../category/category.service";
import brandSvc from "../brand/brand.service";
import { AuthContext } from "../../components/context/AuthContext";
import authSvc from "../auth/auth.service";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [catList, setCatList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [sellerList, setSellerList] = useState([]);

  const {
    auth: { loggedInUser },
  } = useContext(AuthContext);

  // Validation schema
  const productCreateDto = Yup.object({
    title: Yup.string().min(3).max(100).required("Title is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().nullable(),
    price: Yup.number()
      .min(100, "Price must be at least 100")
      .required("Price is required"),
    discount: Yup.number()
      .min(0)
      .max(100, "Discount must be between 0 and 100")
      .default(0),
    status: Yup.string().oneOf(["active", "inactive"]).default("inactive"),
    description: Yup.string().nullable(),
    seller: Yup.string().nullable(),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productCreateDto),
    defaultValues: {
      title: "",
      description: "",
      status: "inactive",
    },
  });

  // Add product function
  const addProduct = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      // Append images
      if (images.length > 0) {
        images.forEach((img) => {
          formData.append("images", img, img.name);
        });
      }

      // Call API
      await productSvc.productCreate(formData);

      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (error) {
      setErrorInfo(error, setError);
      toast.error("Error creating product. Please try again.");
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load categories
  const loadAllCats = useCallback(async () => {
    try {
      const response = await categorySvc.getCategoryList({
        page: 1,
        limit: 100,
      });
      const list = [{ label: "--Select any one--", value: "" }];
      response.data.forEach((cat) =>
        list.push({ label: cat.title, value: cat._id })
      );
      setCatList(list);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Load brands
  const loadAllBrands = useCallback(async () => {
    try {
      const response = await brandSvc.getBrandList({ page: 1, limit: 100 });
      const list = [{ label: "--Select any one--", value: "" }];
      response.data.forEach((brand) =>
        list.push({ label: brand.title, value: brand._id })
      );
      setBrandList(list);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Load sellers for admin
  const loadSellerUsers = useCallback(async () => {
    try {
      const res = await authSvc.getUsersByRole({ role: "seller" });
      const list = [{ label: "--Select any one--", value: "" }];
      res.data.forEach((user) =>
        list.push({ label: user.name, value: user._id })
      );
      setSellerList(list);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadAllCats();
    loadAllBrands();
    if (loggedInUser?.role === "admin") loadSellerUsers();
  }, [loadAllCats, loadAllBrands, loadSellerUsers, loggedInUser]);

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <AdminPageTitle pageTitle="Product Create Page" />
      <div className="mx-auto my-3 px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
          <div className="px-5 py-5">
            <form onSubmit={handleSubmit(addProduct)}>
              {/* Title */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                <div className="sm:col-span-2">
                  <InputLabelComponent htmlFor="title" label="Title:" />
                  <TextInputComponent
                    name="title"
                    control={control}
                    placeholder="Enter Product Title"
                    errorMsg={errors?.title?.message}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                <div className="sm:col-span-2">
                  <InputLabelComponent htmlFor="category" label="Category:" />
                  <SelectOptionComponent
                    name="category"
                    control={control}
                    errorMsg={errors?.category?.message}
                    options={catList}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                <div className="sm:col-span-2">
                  <InputLabelComponent htmlFor="price" label="Price (Npr.):" />
                  <TextInputComponent
                    name="price"
                    control={control}
                    type="number"
                    placeholder="Enter Product Price"
                    errorMsg={errors?.price?.message}
                  />
                </div>
              </div>

              {/* Discount */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                <div className="sm:col-span-2">
                  <InputLabelComponent
                    htmlFor="discount"
                    label="Discount (%):"
                  />
                  <TextInputComponent
                    name="discount"
                    control={control}
                    type="number"
                    placeholder="Enter Product Discount in %"
                    errorMsg={errors?.discount?.message}
                  />
                </div>
              </div>

           <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
  <div className="sm:col-span-2">
    <InputLabelComponent htmlFor="description" label="Description:" />
    <HtmlEditor
      name="description"
      control={control}
      errorMsg={errors?.description?.message}
    />
  </div>
</div>


              {/* Brand */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                <div className="sm:col-span-2">
                  <InputLabelComponent htmlFor="brand" label="Brand:" />
                  <SelectOptionComponent
                    name="brand"
                    control={control}
                    errorMsg={errors?.brand?.message}
                    options={brandList}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                <div className="sm:col-span-2">
                  <InputLabelComponent htmlFor="status" label="Status:" />
                  <SelectOptionComponent
                    name="status"
                    control={control}
                    errorMsg={errors?.status?.message}
                    options={[
                      { label: "Publish", value: "active" },
                      { label: "Unpublish", value: "inactive" },
                    ]}
                  />
                </div>
              </div>

              {/* Seller (only admin) */}
              {loggedInUser?.role === "admin" && (
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor="seller" label="Seller:" />
                    <SelectOptionComponent
                      name="seller"
                      control={control}
                      errorMsg={errors?.seller?.message}
                      options={sellerList}
                    />
                  </div>
                </div>
              )}

              {/* Image Upload */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                <div className="sm:col-span-2">
                  <InputLabelComponent htmlFor="images" label="Images:" />
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setImages([...e.target.files])}
                    className="block mt-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-5 mb-3">
                <FormActionButton
                  showCancel={true}
                  submitLabel="Add Product"
                  disableBtn={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProductPage;
