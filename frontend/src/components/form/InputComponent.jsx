import React from "react";
import { useController } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

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
  defaultValue = ""
}) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: defaultValue
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

export const RadioButtonComponent = ({
  options,
  name,
  control,
  errorMsg = null,
}) => {
  const { field } = useController({
    name: name,
    control: control,
  });
  return (
    <>
      {options &&
        options.map((radioOpts, index) => (
          <div key={index} className="flex items-center me-4">
            <input
              {...field}
              id={name + "-" + radioOpts.value}
              type="radio"
              value={radioOpts.value}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 me-1"
            />
            <InputLabelComponent
              htmlFor={name + "-" + radioOpts.value}
              label={radioOpts.label}
            />
          </div>
        ))}
      <span className="text-red-800">{errorMsg}</span>
    </>
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
        <div className={`${
            thumb ? "w-3/4" : "w-full"
          }`}>
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          className={`block mt-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
          id={name}
          type="file"
        />
        </div>

        {thumb && (
          <div className="w-1/4 flex items-center">
            <img className="w-[45%] " src={
              typeof thumb === 'string' ? thumb : URL.createObjectURL(thumb)
            } alt="" />
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
