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
import {useDispatch} from "react-redux";
import { categoryCreate, getCatList } from "../../stores/CategoryStore";
import { toast } from "react-toastify";
import categorySvc from "./category.service";


const AddCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const  dispatch = useDispatch()
  const [catList, setCatList] = useState();

  // Validation schema
  const categoryCreateDto = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title must not exceed 100 characters")
      .required("Title is required"),

    description: Yup.string().nullable().optional(),
    parentId: Yup.string().nullable().optional().default(null),

    status: Yup.string()
      .matches(
        /^(active|inactive)$/,
        "Status must be either 'active' or 'inactive'"
      )
      .required("Status is required"),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categoryCreateDto),
    defaultValues: {
      title: "", 
      description: "",
      status: "inactive",
    },
  });

  const addCategory = async (data) => {
    try {
      console.log(data)
      setLoading(true);
      data.image = image;

      dispatch(categoryCreate(data))
      dispatch(getCatList({page: 1, search: null}))

      // // API call
      // await categorySvc.categoryCreate(data);
      // toast.success("Category created successfully.");
      navigate("/admin/categories");
    } catch (exception) {
      setErrorInfo(exception, setError);
      console.error("Error creating category:", exception);
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
        <AdminPageTitle pageTitle={"Category Create Page"} />
        <div className="mx-auto my-3 px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="px-5 py-5">
              <form onSubmit={handleSubmit(addCategory)}>
                {/* Title Input */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor="title" label="Title: " />
                    <TextInputComponent
                      name="title"
                      control={control}
                      placeholder="Enter Category Title"
                      errorMsg={errors?.title?.message}
                    />
                  </div>
                </div>

                 {/* parentId Dropdown */}
                 <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor="parentId" label="Sub Category Of: " />
                    <SelectOptionComponent
                      name="parentId"
                      control={control}
                      errorMsg={errors?.parentId?.message}
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
                    submitLabel="Add Category"
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

export default AddCategoryPage;
