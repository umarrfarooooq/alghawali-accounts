import React from "react";
import SelectInput from "../ui/Select-Input";
import Label from "../ui/Label";

const banks = [
  { value: "Bank Muscat", label: "Bank Muscat" },
  { value: "Bank Dhofar", label: "Bank Dhofar" },
  { value: "Oman Arab Bank", label: "Oman Arab Bank" },
  { value: "POS", label: "POS" },
];

const Banks = ({
  paymentMethod,
  selectedBank,
  handleSelectChange,
  staffName: staffId,
}) => {
  return (
    <>
      {paymentMethod === "Bank Transfer" && (
        <div className="flex flex-col gap-1 w-full">
          <Label label="Select Bank" htmlFor="selectedBank" />
          <SelectInput
            selectValue={selectedBank}
            options={banks.map((bank) => ({
              value: bank.value,
              label: bank.label,
            }))}
            onChange={(value) => handleSelectChange("selectedBank", value)}
          />
        </div>
      )}
    </>
  );
};

export default Banks;
