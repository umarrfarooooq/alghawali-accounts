import React from "react";
import { useFilePreview } from "@/hooks/useFilePreview";
import { X } from "lucide-react";

const InputFile = ({
  htmlFor,
  id,
  name,
  label = "Click To Upload",
  onChange,
  className = "",
  initialPreview = null,
  iconClassName = "w-8 h-8 mb-4 text-gray-500",
  containerClassName = "flex flex-col items-center justify-center pt-5 pb-6",
}) => {
  const { filePreview, handleFileChange, clearPreview, fileInputRef } =
    useFilePreview(initialPreview);

  const handleChange = (e) => {
    handleFileChange(e);
    if (onChange) onChange(e);
  };

  return (
    <>
      {filePreview && (
        <div className="relative my-4 w-32 h-auto">
          <img
            src={filePreview}
            alt="Preview"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <div
        className={`flex items-center mb-4 justify-center w-full ${className}`}
      >
        <label
          htmlFor={htmlFor}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-gray-100"
        >
          <div className={containerClassName}>
            <svg
              className={iconClassName}
              xmlns="http://www.w3.org/2000/svg"
              width="57"
              height="57"
              viewBox="0 0 57 57"
              fill="none"
            >
              <path
                d="M9.84421 35.1131C8.11064 33.3419 6.80287 31.1994 6.01996 28.8479C5.23705 26.4965 4.99953 23.9977 5.32539 21.5408C5.65125 19.0839 6.53195 16.7334 7.90077 14.6673C9.26959 12.6013 11.0906 10.8738 13.226 9.61571C15.3613 8.35767 17.755 7.60205 20.2256 7.40611C22.6962 7.21017 25.1791 7.57903 27.486 8.48477C29.793 9.3905 31.8635 10.8094 33.5409 12.6338C35.2183 14.4583 36.4585 16.6406 37.1675 19.0154H41.3442C43.5971 19.0152 45.7903 19.7395 47.5999 21.0815C49.4094 22.4234 50.7394 24.3118 51.3933 26.4676C52.0473 28.6235 51.9905 30.9325 51.2313 33.0536C50.4722 35.1747 49.0509 36.9954 47.1775 38.2468"
                stroke="#434146"
                strokeWidth="4.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M28.5078 49.3489L28.5078 28.3489"
                stroke="#434146"
                strokeWidth="4.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M37.8438 37.6821L28.5104 28.3488L19.1771 37.6821"
                stroke="#434146"
                strokeWidth="4.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">{label}</span>
            </p>
          </div>
          <input
            onChange={handleChange}
            id={id}
            type="file"
            name={name}
            ref={fileInputRef}
            hidden
          />
        </label>
      </div>
    </>
  );
};

export default InputFile;
