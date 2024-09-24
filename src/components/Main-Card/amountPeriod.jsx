import React from "react";
import SelectInput from "../ui/Select-Input";

const AmountPeriod = ({ onPeriodChange, selectedPeriod }) => {
  return (
    <>
      <SelectInput
        className="w-full md:max-w-56 mb-2 h-10"
        selectValue={selectedPeriod}
        onChange={(value) => {
          onPeriodChange(value);
        }}
        options={[
          { value: "Weekly", label: "Weekly" },
          { value: "Monthly", label: "Monthly" },
          { value: "Yearly", label: "Yearly" },
        ]}
      />
    </>
  );
};

export default AmountPeriod;
