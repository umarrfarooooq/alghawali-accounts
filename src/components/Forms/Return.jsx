"use client";
import React, { useState } from "react";
import { Save } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { MaidSearch } from "../New-Hiring/Search-Maid";
import CustomButton from "../ui/CustomBtn";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import Message from "../ui/Message";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Return = () => {
  const { verifyToken } = VerifyStaffToken();
  const router = useRouter();
  const [selectedMaidId, setSelectedMaidId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [spinningLoader, setSpinningLoader] = useState(false);
  const { toast } = useToast();
  const [officeCharges, setOfficeCharges] = useState(0);
  const [customerReceivedAmount, setCustomerReceivedAmount] = useState(0);

  const handleMaidSelect = async (maid) => {
    setSelectedMaidId(maid._id);
    try {
      const response = await axiosInstance.get(
        `api/v2/customers/customer-account/${maid._id}`,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );
      const { receivedAmount, pendingReceivedAmount } = response.data;
      const totalReceived = receivedAmount + pendingReceivedAmount;
      setCustomerReceivedAmount(totalReceived);
    } catch (error) {
      console.error("Error fetching customer account details:", error);
      handleError(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setWarningMessage("");
    setSpinningLoader(true);

    if (!selectedMaidId) {
      setSpinningLoader(false);
      return setErrorMessage("Please Select Valid Maid Profile");
    }

    if (officeCharges > customerReceivedAmount) {
      setSpinningLoader(false);
      return setWarningMessage(
        "Warning: Office charges exceed the total received amount."
      );
    }

    const formData = {
      maidId: selectedMaidId,
      officeCharges: officeCharges,
    };
    console.log("Request body:", formData);
    try {
      const response = await axiosInstance.post(
        `api/v2/hiring/return`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          description:
            "Maid return processed successfully redirecting to add Transaction",
        });
        setTimeout(() => {
          router.push("/update-payment");
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
      setErrorMessage(
        error.response.data.error || "An error occurred. Please try again."
      );
    } else if (error.request) {
      setErrorMessage(
        "No response from server. Please check your internet connection."
      );
    } else {
      setErrorMessage("An error occurred. Please try again.");
    }
    console.error("Error submitting form:", error);
  };

  return (
    <div className="bg-[#FFFBFA] border border-[#EBEBEB] w-full lg:max-w-[38rem] lg:min-w-[38rem] mx-auto p-3 sm:p-8 rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="text-2xl font-semibold">Return Maid</div>
      </div>

      <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
        {errorMessage && <Message type="error" message={errorMessage} />}
        {warningMessage && <Message type="warning" message={warningMessage} />}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <div>
            <Label label="Select Maid" />
            <MaidSearch
              onMaidSelect={handleMaidSelect}
              apiEndpoint="api/v1/maids/hired-maids/"
              placeholder="Search maid to return..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label label="Office Charges" htmlFor="officeCharges" />
            <Input
              placeholder="Office Charges"
              name="officeCharges"
              id="officeCharges"
              type="number"
              value={officeCharges}
              onChange={(e) => setOfficeCharges(Number(e.target.value))}
            />
          </div>

          <CustomButton
            type="submit"
            loading={spinningLoader}
            icon={<Save size={20} />}
            txt="Process Return"
            bg="bg-[#107243]"
            color="text-[#FFFBFA]"
          />
        </form>
      </div>
    </div>
  );
};

export default React.memo(Return);
