import React, { useEffect, useState } from "react";
import Label from "../ui/Label";
import SelectInput from "../ui/Select-Input";
import axiosInstance from "@/utils/axios";

const RecievedBy = ({ handleSelectChange, receivedValue }) => {
  const [accountOptions, setAccountOptions] = useState([]);

  useEffect(() => {
    const fetchAccountNames = async () => {
      try {
        const response = await axiosInstance.get(
          "api/v1/staffAccounts/all-account-names-id"
        );
        const options = response.data.map((account) => ({
          value: account.id,
          label: account.name,
        }));
        setAccountOptions(options);
      } catch (error) {
        console.error("Error fetching account names:", error);
      }
    };

    fetchAccountNames();
  }, []);
  return (
    <>
      <Label label="Received By" htmlFor="Received By" />
      <SelectInput
        selectValue={receivedValue}
        options={accountOptions}
        onChange={(value) => handleSelectChange("receivedBy", value)}
      />
    </>
  );
};

export default RecievedBy;
