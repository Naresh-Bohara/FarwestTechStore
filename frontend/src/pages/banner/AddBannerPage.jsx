import { useForm } from "react-hook-form";
import { AdminPageTitle } from "../../components/admin-page-layout/adminPageTitle";
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
import {DateTime} from "luxon"
import bannerSvc from "./banner.service";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

const AddBannerPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [image, setImage] = useState();

  const bannerCreateDto = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title must not exceed 100 characters")
      .required("Title is required"),
    
    link: Yup.string()
      .url("Link must be a valid URL")
      .nullable()
      .optional(),
  
    startDate: Yup.date()
      .required("Start date is required"),
  
    endDate: Yup.date()
      .min(
        Yup.ref("startDate"),
        "End date must be after or equal to the start date"
      )
      .required("End date is required"),
  
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bannerCreateDto),
    defaultValues: {
      title: "", 
      link: "",   
      startDate: "",  
      endDate: "",    
      description: "",  
      status: "inactive",  
    }
  });

  const addBanner = async(data) => {
    try {
      setLoading(true);
      data.image = image;
      data.startDate = DateTime.fromJSDate(data.startDate).toFormat("y-MM-dd")
      data.endDate = DateTime.fromJSDate(data.endDate).toFormat("y-MM-dd")
      
      await bannerSvc.bannerCreate(data);
      toast.success("Banner created successfully.");
      navigate("/admin/banners")
    } catch (exception) {
      setErrorInfo(exception, setError);
      console.log(exception);
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 p-3 sm:p-5">
        <AdminPageTitle pageTitle={"Banner Create Page"} />
        <div className="mx-auto my-3 px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="px-5 py-5">
              <form onSubmit={handleSubmit(addBanner)}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent htmlFor={"title"} label={"Title: "} />
                    <TextInputComponent
                      name={"title"}
                      control={control}
                      placeholder="Enter Banner Title"
                      errorMsg={errors?.title?.message}
                    />
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2 mb-3">
                  <div className="w-full">
                    <InputLabelComponent htmlFor={"startDate"} label={"Start Date: "}/>
                    <TextInputComponent type="date" control={control} name={"startDate"} errorMsg={errors?.startDate?.message} />
                  </div>

                  <div className="w-full">
                    <InputLabelComponent htmlFor={"endDate"} label={"End Date: "}/>
                    <TextInputComponent type="date" control={control} name={"endDate"} errorMsg={errors?.endDate?.message} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent
                      htmlFor={"link"}
                      label={"Link(URL):"}
                    />
                    <TextInputComponent
                      type="url"
                      name={"link"}
                      control={control}
                      placeholder="Enter Banner Title"
                      errorMsg={errors?.link?.message}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
                  <div className="sm:col-span-2">
                    <InputLabelComponent
                      htmlFor={"status"}
                      label={"Status: "}
                    />
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
                      errorMsg={errors?.image?.message}
                      setImage={setImage}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-5  mb-3">
                  <FormActionButton
                    showCancel={true}
                    submitLabel="Add Banner"
                    disableBtn={loading}
                    cancelTo="/admin/banners"
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
export default AddBannerPage;
