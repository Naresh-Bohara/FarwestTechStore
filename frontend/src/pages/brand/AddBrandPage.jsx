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
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormActionButton } from "../../components/button/form-action-btn.component";
import { setErrorInfo } from "../../utilities/helpers";
import brandSvc from "./brand.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBrandPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  // Validation schema
  const brandCreateDto = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title must not exceed 100 characters")
      .required("Title is required"),

    description: Yup.string().nullable().optional(),

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
    resolver: yupResolver(brandCreateDto),
    defaultValues: {
      title: "", 
      description: "",
      status: "inactive",
    },
  });

  const addBrand = async (data) => {
    try {
      setLoading(true);
      data.image = image;

      // API call
      await brandSvc.brandCreate(data);
      toast.success("Brand created successfully.");
      navigate("/admin/brands");
    } catch (exception) {
      setErrorInfo(exception, setError);
      console.error("Error creating brand:", exception);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 p-3 sm:p-5">
        <AdminPageTitle pageTitle={"Brand Create Page"} />
        <div className="mx-auto my-3 px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="px-5 py-5">
              <form onSubmit={handleSubmit(addBrand)}>
                {/* Title Input */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor="title" label="Title: " />
                    <TextInputComponent
                      name="title"
                      control={control}
                      placeholder="Enter Brand Title"
                      errorMsg={errors?.title?.message}
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
                    submitLabel="Add Brand"
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

export default AddBrandPage;
