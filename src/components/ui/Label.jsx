import React from "react";

const Label = ({ label, className, htmlFor }) => {
  return (
    <>
      <label htmlFor={htmlFor} className={`form-label block text-lg text-[#434146] ${className}`}>
        {label}
      </label>
    </>
  );
};

export default Label;
