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
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormActionButton } from "../../components/button/form-action-btn.component";
import { setErrorInfo } from "../../utilities/helpers";
import brandSvc from "./brand.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditBrandPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // Initialize as null
  const params = useParams();

  const brandEditDto = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title must not exceed 100 characters")
      .required("Title is required"),

    description: Yup.string()
      .nullable()
      .optional(),

    status: Yup.string()
      .matches(/^(active|inactive)$/, "Status must be either 'active' or 'inactive'")
      .default("inactive"),
  });

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(brandEditDto),
    defaultValues: {
      title: "",
      description: "",
      status: "inactive",
    },
  });

  const updateBrand = async (data) => {
    try {
      setLoading(true);
      data.image = image;

      if (typeof data.image === "string") {
        delete data.image;
      }
      console.log(data);
      await brandSvc.brandEdit(params.id, data);
      toast.success("Brand updated successfully.");
      navigate("/admin/brands");
    } catch (exception) {
      setErrorInfo(exception, setError);
      console.log(exception);
    } finally {
      setLoading(false);
    }
  };

  const getBrandById = async () => {
    try {
      const res = await brandSvc.getBrandDetailById(params.id);
      setValue("title", res.data.title || "");
      setValue("status", res.data.status || "inactive");
      setValue("description", res.data.description || "");
      setImage(res.data.image || null);
    } catch (exception) {
      toast.error("Brand can't be fetched at this moment!");
      console.log(exception);
      navigate("/admin/brands");
    }
  };

  useEffect(() => {
    getBrandById();
  }, []);

  return (
    <>
      <section className="bg-gray-50 p-3 sm:p-5">
        <AdminPageTitle pageTitle={"Brand Edit Page"} />
        <div className="mx-auto my-3 px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="px-5 py-5">
              <form onSubmit={handleSubmit(updateBrand)}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor={"title"} label={"Title: "} />
                    <TextInputComponent
                      name={"title"}
                      control={control}
                      placeholder="Enter Brand Title"
                      errorMsg={errors?.title?.message}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor={"status"} label={"Status: "} />
                    <SelectOptionComponent
                      name={"status"}
                      control={control}
                      errorMsg={errors?.status?.message}
                      options={[
                        { label: "Publish", value: "active" },
                        { label: "UnPublish", value: "inactive" },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent
                      htmlFor={"description"}
                      label={"Description:"}
                    />
                    <TextAreaComponent
                      name={"description"}
                      control={control}
                      errorMsg={errors?.description?.message}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor={"image"} label={"Image: "} />
                    <ImageUploader
                      thumb={image}
                      errorMsg={errors?.image?.message}
                      setImage={setImage}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-5 mb-3">
                  <FormActionButton
                    showCancel={true}
                    submitLabel="Update Brand"
                    disableBtn={loading}
                    cancelTo="/admin/brands"
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
export default EditBrandPage;
