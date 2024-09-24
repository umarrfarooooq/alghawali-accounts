import React from "react";
import SelectInput from "../ui/Select-Input";
import Label from "../ui/Label";

const banks = [
  { value: "Central Bank", label: "Central Bank" },
  { value: "Central Bank of Oman", label: "Central Bank of Oman" },
  { value: "Bank Muscat", label: "Bank Muscat" },
  { value: "Bank Dhofar", label: "Bank Dhofar" },
  { value: "National Bank of Oman", label: "National Bank of Oman" },
  { value: "Sohar International", label: "Sohar International" },
  { value: "Oman Arab Bank", label: "Oman Arab Bank" },
  { value: "HSBC Oman", label: "HSBC Oman" },
  { value: "Ahli Bank", label: "Ahli Bank" },
  { value: "Bank Nizwa", label: "Bank Nizwa" },
  { value: "Alizz Islamic Bank", label: "Alizz Islamic Bank" },
  { value: "First Abu Dhabi Bank Oman", label: "First Abu Dhabi Bank Oman" },
  {
    value: "Standard and Charter Bank Oman",
    label: "Standard and Charter Bank Oman",
  },
  { value: "Beirut Oman Bank", label: "Beirut Oman Bank" },
];

const Banks = ({ paymentMethod, selectedBank, handleSelectChange }) => {
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
