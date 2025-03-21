import { useNavigate } from "react-router-dom";

export const FormActionButton = ({
  submitLabel = "Submit",
  resetLabel = "Cancel",
  disableBtn = false,
  showCancel = false,
  cancelTo = "/",
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(cancelTo);
  };

  return (
    <>
      <button
        type="submit"
        disabled={disableBtn}
        className={`${showCancel ? 'w-1/2' : 'w-full'} py-2 px-4 me-3 rounded-lg transition-colors duration-300 
          bg-[#213245] text-white hover:bg-white hover:text-black hover:border hover:border-[#213245] 
          ${disableBtn ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {submitLabel}
      </button>

      {showCancel && (
        <button
          type="button"
          disabled={disableBtn}
          onClick={handleCancel}
          className={`w-1/2 py-2 px-4 me-3 rounded-lg transition-colors duration-300 
          bg-[#ba2d2d] text-white hover:bg-white hover:text-[#a33a3a] hover:border hover:border-[#d63434] 
          ${disableBtn ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {resetLabel}
        </button>
      )}
    </>
  );
};
