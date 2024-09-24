import React from "react";
import InputFile from "@/components/ui/Input-File";
import Label from "../ui/Label";

const PaymentSlip = ({
  label = "Payment Slip",
  inputId = "paymentSlip",
  onFileChange,
  className = "mb-6",
  iconClassName = "w-8 h-8 mb-4 text-blue-500",
  initialPreview = null,
}) => {
  const handleFileChange = (e) => {
    if (onFileChange) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div>
      <Label label={label} htmlFor={inputId} />
      <InputFile
        htmlFor={inputId}
        id={inputId}
        name={inputId}
        label={`Upload ${label}`}
        onChange={handleFileChange}
        className={className}
        iconClassName={iconClassName}
        initialPreview={initialPreview}
      />
    </div>
  );
};

export default PaymentSlip;
