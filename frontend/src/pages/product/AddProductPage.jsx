import { useForm } from "react-hook-form";
import { AdminPageTitle } from "../../components/admin-page-layout/AdminPageTitle";
import {
  ImageUploader,
  InputLabelComponent,
  SelectOptionComponent,
  TextAreaComponent,
  TextInputComponent,
} from "../../components/form/InputComponent";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormActionButton } from "../../components/button/form-action-btn.component";
import { setErrorInfo } from "../../utilities/helpers";
import { useNavigate } from "react-router-dom";
import productSvc from "./product.service";
import categorySvc from "../category/category.service";


const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [catList, setCatList] = useState();

  // Validation schema
  const productCreateDto = Yup.object({
    title: Yup.string().min(3).max(100).required(),
  category: Yup.string().required(),
  brand: Yup.string().oneOf([null, '']).optional().default(null),
  price: Yup.number().min(100).required(),
  discount: Yup.number().min(0).max(100).default(0),
  status: Yup.string().oneOf(["active", "inactive"]).default("inactive"),
  description: Yup.string().nullable().default(null),
  images: Yup.array().of(Yup.string()).default([]),
  seller: Yup.string().oneOf([null, '']).optional().default(null),
  });


  //////////////////// to start from: date: 12-15; time: 23:30 ////////////////////

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

  const addProduct = async (data) => {
    try {
      console.log(data)
      setLoading(true);
      data.image = image;

      // // API call
      await productSvc.productCreate(data);
      toast.success("Product created successfully.");
      navigate("/admin/categories");
    } catch (exception) {
      setErrorInfo(exception, setError);
      console.error("Error creating product:", exception);
    } finally {
      setLoading(false);
    }
  };

 const loadAllCats = useCallback(async(parentId = null)=>{
    try{
      let response = await categorySvc.getCategoryList({
        page: 1,
        limit: 100
      })

      let list = [
        { label: "--Select any one--", value: null }
      ]
      response.data.map((cat)=>{
        list.push({
          label: cat.title, 
          value: cat._id
        })
      })
      setCatList(list)
    }catch(exception){
    }
  })

  useEffect(()=>{
    loadAllCats();
  }, [])

  return (
    <>
      <section className="bg-gray-50 p-3 sm:p-5">
        <AdminPageTitle pageTitle={"Product Create Page"} />
        <div className="mx-auto my-3 px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="px-5 py-5">
              <form onSubmit={handleSubmit(addProduct)}>
                {/* Title Input */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor="title" label="Title: " />
                    <TextInputComponent
                      name="title"
                      control={control}
                      placeholder="Enter Product Title"
                      errorMsg={errors?.title?.message}
                    />
                  </div>
                </div>

                 {/* Category Dropdown */}
                 <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor="parentId" label="Category: " />
                    <SelectOptionComponent
                      name="category"
                      control={control}
                      errorMsg={errors?.category?.message}
                      options={catList || []}
                    />
                  </div>
                </div>

                {/* Status Dropdown */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor="status" label="Status: " />
                    <SelectOptionComponent
                      name="status"
                      control={control}
                      errorMsg={errors?.status?.message}
                      defaultValue={"inactive"}
                      options={[
                        { label: "Publish", value: "active" },
                        { label: "Unpublish", value: "inactive" },
                      ]}
                    />
                  </div>
                </div>

                {/* Description Text Area */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent
                      htmlFor="description"
                      label="Description:"
                    />
                    <TextAreaComponent
                      name="description"
                      control={control}
                      errorMsg={errors?.description?.message}
                    />
                  </div>
                </div>

                {/* Image Uploader */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor="image" label="Image: " />
                    <ImageUploader
                      errorMsg={errors?.image?.message}
                      setImage={setImage}
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
    </>
  );
};

export default AddProductPage;
