"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import CustomButton from "../ui/CustomBtn";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import Message from "../ui/Message";
import { useToast } from "@/hooks/use-toast";
import ValidStaff from "../Form-Components/Valid-Staff";

const CreateStaffAccountForm = () => {
  const { verifyToken } = VerifyStaffToken();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [spinningLoader, setSpinningLoader] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSpinningLoader(true);

    if (!selectedStaffId) {
      setSpinningLoader(false);
      return setErrorMessage("Please Select Valid Staff Profile");
    }

    const formData = new FormData(e.currentTarget);
    formData.append("staffId", selectedStaffId);

    try {
      const response = await axiosInstance.post(
        `api/v1/staffAccounts/create-account`,
        Object.fromEntries(formData),
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Staff account created successfully");
        toast({
          title: "Success",
          variant: "success",
          description:
            response.data.message ||
            "Staff account created successfully redirecting to home page",
        });
        setTimeout(() => {
          router.push(`/`);
        }, 1000);
      }
      setSpinningLoader(false);
    } catch (error) {
      setSpinningLoader(false);
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          setErrorMessage(
            data.error || "Validation error. Please check your input."
          );
          break;
        case 401:
          setErrorMessage("Unauthorized. Please log in again.");
          break;
        case 403:
          setErrorMessage(
            data.error || "You don't have permission to perform this action."
          );
          break;
        case 404:
          setErrorMessage(data.error || "Staff not found.");
          break;
        case 500:
          setErrorMessage("Server error. Please try again later.");
          break;
        default:
          setErrorMessage(
            `An error occurred: ${data.error || "Please try again."}`
          );
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } else if (error.request) {
      setErrorMessage(
        "No response from server. Please check your internet connection."
      );
    } else {
      setErrorMessage("An error occurred. Please try again.");
    }

    console.error("Error creating staff account:", error);
  };

  return (
    <div className="bg-[#FFFBFA] border border-[#EBEBEB] w-full lg:max-w-[38rem] lg:min-w-[38rem] mx-auto p-3 sm:p-8 rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="text-2xl font-semibold">Create Staff Account</div>
      </div>

      <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
        {errorMessage && <Message type="error" message={errorMessage} />}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <div>
            <ValidStaff
              handleSelectChange={setSelectedStaffId}
              selectedValue={selectedStaffId}
              label="Select Staff"
              name="staffId"
              placeholder="Select Staff"
            />
          </div>

          <CustomButton
            type="submit"
            loading={spinningLoader}
            icon={<Save size={20} />}
            txt="Create Staff Account"
            bg="bg-[#107243]"
            color="text-[#FFFBFA]"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateStaffAccountForm;
