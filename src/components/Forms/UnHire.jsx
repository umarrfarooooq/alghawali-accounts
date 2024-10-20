"use client";
import React, { useState } from "react";
import { Save } from "lucide-react";
import Label from "@/components/ui/Label";
import { MaidSearch } from "../New-Hiring/Search-Maid";
import CustomButton from "../ui/CustomBtn";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import Message from "../ui/Message";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const UnHire = () => {
  const { verifyToken } = VerifyStaffToken();
  const router = useRouter();
  const [selectedMaidId, setSelectedMaidId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [spinningLoader, setSpinningLoader] = useState(false);
  const { toast } = useToast();

  const handleMaidSelect = (maid) => {
    setSelectedMaidId(maid._id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSpinningLoader(true);

    if (!selectedMaidId) {
      setSpinningLoader(false);
      return setErrorMessage("Please Select Valid Maid Profile");
    }

    try {
      const response = await axiosInstance.post(
        `api/v2/hiring/unhire-maid/${selectedMaidId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          description: "Maid unhired successfully",
        });
        setTimeout(() => {
          router.push("/");
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
        <div className="text-2xl font-semibold">Unhire Maid</div>
      </div>

      <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
        {errorMessage && <Message type="error" message={errorMessage} />}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <div>
            <Label label="Select Maid" />
            <MaidSearch
              onMaidSelect={handleMaidSelect}
              apiEndpoint="api/v1/maids/hired-maids/"
              placeholder="Search maid to unhire..."
            />
          </div>

          <CustomButton
            type="submit"
            loading={spinningLoader}
            icon={<Save size={20} />}
            txt="Unhire Maid"
            bg="bg-[#107243]"
            color="text-[#FFFBFA]"
          />
        </form>
      </div>
    </div>
  );
};

export default React.memo(UnHire);
