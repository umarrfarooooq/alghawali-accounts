import React, { useEffect, useState } from "react";
import Label from "../ui/Label";
import SelectInput from "../ui/Select-Input";
import axiosInstance from "@/utils/axios";

const ValidStaff = ({
  handleSelectChange,
  selectedValue,
  label = "Staff",
  name = "staff",
  placeholder = "Select staff...",
}) => {
  const [staffOptions, setStaffOptions] = useState([]);

  useEffect(() => {
    const fetchStaffAccounts = async () => {
      try {
        const response = await axiosInstance.get(
          "api/v1/staffAccounts/all-valid-staff"
        );
        const options = response.data.map((account) => ({
          value: account.id,
          label: account.staffName,
        }));
        setStaffOptions(options);
      } catch (error) {
        console.error("Error fetching staff accounts:", error);
      }
    };

    fetchStaffAccounts();
  }, []);

  return (
    <>
      <Label label={label} htmlFor={name} />
      <SelectInput
        selectValue={selectedValue}
        options={staffOptions}
        onChange={(value) => handleSelectChange(value)}
        placeholder={placeholder}
      />
    </>
  );
};

export default ValidStaff;
