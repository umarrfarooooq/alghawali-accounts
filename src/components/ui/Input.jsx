import React from "react";

const Input = ({
  type = "text",
  className,
  name,
  id,
  value,
  readOnly = false,
  onClick,
  onChange,
  placeholder,
  defaultValue,
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={`w-full bg-[#E3E3E3] filter border border-[#C3D0D4] h-[4rem] outline-none rounded-lg px-4 py-2 text-left ${className}`}
        name={name}
        onClick={onClick}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
    </>
  );
};

export default Input;
