import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useController } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // important

export const HtmlEditor = ({ control, name, errorMsg = null }) => {
  const { field } = useController({ control, name });

  return (
    <div className="mb-3">
      <ReactQuill
        theme="snow"
        value={field.value || ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
        modules={{
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }}
      />
      {errorMsg && <span className="text-red-800">{errorMsg}</span>}
    </div>
  );
};

export const InputLabelComponent = ({ htmlFor, label }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-800 mb-1"
      >
        {label}
      </label>
    </>
  );
};

export const TextInputComponent = ({
  type = "text",
  control,
  name,
  readonly=false,
  placeholder = "Enter your text...",
  errorMsg = null,
}) => {
  const { field } = useController({
    control: control,
    name: name,
  });

  return (
    <>
      <input
        type={type}
        id={name}
        {...field}
        readOnly={readonly}
        value={field.value ?? ""}  
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        placeholder={placeholder}
      />
      <span className="text-red-800">{errorMsg}</span>
    </>
  );
};


export const SelectOptionComponent = ({
  name,
  control,
  options,
  errorMsg = null,
  defaultValue = "",
}) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: defaultValue,
  });
  const safeValue = field.value ?? "";
  return (
    <>
      <select
        id={name}
        {...field}
        value={safeValue}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      >
        {options.map((row, index) => (
          <option key={index} value={row.value}>
            {row.label}
          </option>
        ))}
      </select>
      <span className="text-red-800">{errorMsg}</span>
    </>
  );
};

export const RadioInputComponent = ({ control, name, options, errorMsg = null }) => {
    const { field } = useController({
        name: name,
        control: control,
    });

    return (
        <div className="flex flex-wrap gap-6 items-center">
            {options?.map((radioOption, index) => (
                <label
                    key={index}
                    htmlFor={`${name}-${radioOption.value}`}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300"
                >
                    <input
                        {...field}
                        id={`${name}-${radioOption.value}`}
                        type="radio"
                        value={radioOption.value}
                        checked={field.value === radioOption.value}
                        className="w-4 h-4 text-teal-400 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-teal-700 dark:bg-gray-700 dark:border-gray-600"
                    />
                    {radioOption.label}
                </label>
            ))}

            {errorMsg && (
                <span className="w-full text-sm text-red-600 mt-1">
                    {errorMsg}
                </span>
            )}
        </div>
    );
};


export const TextAreaComponent = ({
  control,
  placeholder,
  name,
  errorMsg = null,
}) => {
  const { field } = useController({
    control: control,
    name: name,
  });
  return (
    <>
      <textarea
        id={name}
        {...field}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        rows={5}
        style={{ resize: "none" }}
      ></textarea>
      <span className="text-red-800">{errorMsg}</span>
    </>
  );
};

export const ImageUploader = ({
  setImage,
  name,
  thumb = null,
  errorMsg = null,
}) => {
  return (
    <>
      <div className="flex gap-3">
        <div className={`${thumb ? "w-3/4" : "w-full"}`}>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            className={`block mt-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
            name={name}
            id={name}
            type="file"
          />
        </div>

        {thumb && (
          <div className="w-1/4 flex items-center">
            <img
              className="w-[45%] "
              src={
                typeof thumb === "string" ? thumb : URL.createObjectURL(thumb)
              }
              alt=""
            />
          </div>
        )}
      </div>

      <span className="text-red-800">{errorMsg}</span>
    </>
  );
};

export const PasswordInputComponent = ({
  control,
  placeholder = "Enter your password",
  name,
  errorMsg = null,
  showPasswordField = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const { field } = useController({
    control: control,
    name: name,
  });

  return (
    <>
      <div className="flex">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          id={name}
          {...field} // This ensures that the input is controlled
          value={field.value || ""} // Ensure the value is always a string (empty string if undefined)
          className={` ${
            showPasswordField ? "rounded-s-lg" : "rounded-lg"
          } block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
        />

        {showPasswordField && (
          <span
            className="hover:cursor-pointer inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
      </div>
      {errorMsg && <span className="text-red-800">{errorMsg}</span>}
    </>
  );
};
