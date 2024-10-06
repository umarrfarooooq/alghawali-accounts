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
import { DatePicker } from "../New-Hiring/Date-Picker";
import { useRouter } from "next/navigation";

const Replace = () => {
  const { verifyToken } = VerifyStaffToken();
  const router = useRouter();
  const [oldMaidId, setOldMaidId] = useState("");
  const [newMaidId, setNewMaidId] = useState("");
  const [replaceDate, setReplaceDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [spinningLoader, setSpinningLoader] = useState(false);
  const { toast } = useToast();
  const [newMaidPrice, setNewMaidPrice] = useState(0);
  const [officeCharges, setOfficeCharges] = useState(0);

  const handleOldMaidSelect = (maid) => {
    setOldMaidId(maid._id);
  };

  const handleNewMaidSelect = (maid) => {
    setNewMaidId(maid._id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setWarningMessage("");
    setSpinningLoader(true);

    if (!oldMaidId || !newMaidId) {
      setSpinningLoader(false);
      return setErrorMessage("Please Select Valid Old and New Maid Profiles");
    }

    if (!replaceDate) {
      setSpinningLoader(false);
      return setErrorMessage("Please select a replace date");
    }

    if (newMaidPrice < 0) {
      setSpinningLoader(false);
      return setErrorMessage("New Maid Price cannot be less than 0");
    }

    const formData = {
      oldMaidId,
      newMaidId,
      newMaidPrice,
      officeCharges,
      replaceDate,
    };
    console.log(formData);

    try {
      const response = await axiosInstance.post(
        `/api/v2/hiring/replace`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          description: "Maid replaced successfully redirecting to Add Transaction",
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
        <div className="text-2xl font-semibold">Replace Maid</div>
      </div>

      <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
        {errorMessage && <Message type="error" message={errorMessage} />}
        {warningMessage && <Message type="warning" message={warningMessage} />}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <div>
            <Label label="Select Old Maid" />
            <MaidSearch
              onMaidSelect={handleOldMaidSelect}
              apiEndpoint="api/v1/maids/hired-maids/"
              placeholder="Search old maid to replace..."
            />
          </div>
          <div>
            <Label label="Select New Maid" />
            <MaidSearch
              onMaidSelect={handleNewMaidSelect}
              apiEndpoint="api/v1/maids/"
              placeholder="Search new maid..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label label="New Maid Price" htmlFor="newMaidPrice" />
            <Input
              placeholder="New Maid Price"
              name="newMaidPrice"
              id="newMaidPrice"
              type="number"
              value={newMaidPrice}
              onChange={(e) => setNewMaidPrice(Number(e.target.value))}
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
          <div className="flex flex-col gap-1">
            <Label label="Replace Date" htmlFor="replaceDate" />
            <DatePicker setHiringDate={setReplaceDate} />
          </div>
          <CustomButton
            type="submit"
            loading={spinningLoader}
            icon={<Save size={20} />}
            txt="Process Replace"
            bg="bg-[#107243]"
            color="text-[#FFFBFA]"
          />
        </form>
      </div>
    </div>
  );
};

export default React.memo(Replace);
