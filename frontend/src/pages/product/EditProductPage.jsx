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
import { useNavigate, useParams } from "react-router-dom";
import productSvc from "./product.service";
import categorySvc from "../category/category.service";
import brandSvc from "../brand/brand.service";
import { AuthContext } from "../../components/context/AuthContext";
import authSvc from "../auth/auth.service";
import { toast } from "react-toastify";

const EditProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // new uploaded files
  const [existingImages, setExistingImages] = useState([]); // already saved images
  const [catList, setCatList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [sellerList, setSellerList] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const {
    auth: { loggedInUser },
  } = useContext(AuthContext);

  // Validation schema
  const productEditDto = Yup.object({
    title: Yup.string().min(3).max(100).required("Title is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().nullable(),
    price: Yup.number()
      .min(100, "Price must be at least 100")
      .required("Price is required"),
    discount: Yup.number().min(0).max(100, "Discount must be between 0 and 100"),
    status: Yup.string().oneOf(["active", "inactive"]).default("inactive"),
    description: Yup.string().nullable(),
    seller: Yup.string().nullable(),
  });

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productEditDto),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      discount: 0,
      status: "inactive",
      category: "",
      brand: "",
      seller: "",
    },
  });

  // Update product
const updateProduct = async (data) => {
  try {
    setLoading(true);

    const formData = new FormData();

    // Append all normal fields
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    // Append new images if any
    images.forEach((img) => {
      formData.append("images", img); // must match backend field
    });

    // Append existing images info
    // assuming your backend expects a list of URLs or IDs to keep
    existingImages.forEach((img) => {
      formData.append("existingImages", img); // match backend expected field
    });

    await productSvc.productEdit(params.id, formData, { auth: true, file: true });
    toast.success("Product updated successfully!");
    navigate("/admin/products");
  } catch (error) {
    setErrorInfo(error, setError);
    toast.error("Error updating product. Please try again.");
    console.error("Error updating product:", error);
  } finally {
    setLoading(false);
  }
};



  // Load categories
  const loadAllCats = useCallback(async () => {
    try {
      const response = await categorySvc.getCategoryList({ page: 1, limit: 100 });
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

  // Load sellers (only admin)
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

  // Get product details
  const getProductById = useCallback(async () => {
    try {
      const res = await productSvc.getProductDetailById(params.id);
      const product = res.data;

      setValue("title", product.title || "");
      setValue("category", product.category?._id || "");
      setValue("brand", product.brand?._id || "");
      setValue("price", product.price || "");
      setValue("discount", product.discount || 0);
      setValue("status", product.status || "inactive");
      setValue("description", product.description || "");
      setValue("seller", product.seller?._id || "");
      setExistingImages(product.images || []);
    } catch (error) {
      toast.error("Product can't be fetched at this moment!");
      console.error(error);
      navigate("/admin/products");
    }
  }, [params.id, setValue, navigate]);

  useEffect(() => {
    getProductById();
    loadAllCats();
    loadAllBrands();
    if (loggedInUser?.role === "admin") loadSellerUsers();
  }, [getProductById, loadAllCats, loadAllBrands, loadSellerUsers, loggedInUser]);

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <AdminPageTitle pageTitle="Product Edit Page" />
      <div className="mx-auto my-3 px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
          <div className="px-5 py-5">
            <form onSubmit={handleSubmit(updateProduct)}>
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
                  <InputLabelComponent htmlFor="discount" label="Discount (%):" />
                  <TextInputComponent
                    name="discount"
                    control={control}
                    type="number"
                    placeholder="Enter Product Discount in %"
                    errorMsg={errors?.discount?.message}
                  />
                </div>
              </div>

              {/* Description */}
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

              {/* Existing Images Preview */}
              {existingImages.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent label="Existing Images:" />
                    <div className="flex gap-3 flex-wrap">
                      {existingImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="product"
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                <div className="sm:col-span-2">
                  <InputLabelComponent htmlFor="images" label="Upload New Images:" />
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
                  submitLabel="Update Product"
                  disableBtn={loading}
                  cancelTo="/admin/products"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProductPage;
