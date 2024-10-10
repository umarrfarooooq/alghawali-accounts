"use client";
import React, { useState } from "react";
import CustomButton from "../ui/CustomBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import Input from "../ui/Input";
import Label from "../ui/Label";
import SelectInput from "../ui/Select-Input";
import { DatePicker } from "../New-Hiring/Date-Picker";
import Banks from "../New-Hiring/Banks";
import PaymentSlip from "../New-Hiring/PaymentSlip";
import StaffSelect from "../Form-Components/StaffSelect";
import axiosInstance from "@/utils/axios";
import { toast } from "@/hooks/use-toast";
import Message from "../ui/Message";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";

const TransferAmount = () => {
  const { staffAccountId } = VerifyStaffToken();

  const [formState, setFormState] = useState({
    receiverId: "",
    amount: "",
    paymentMethod: "",
    selectedBank: "",
    description: "",
    date: new Date(),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [spinningLoader, setSpinningLoader] = useState(false);
  const [proofFile, setProofFile] = useState(null);

  const handleSelectChange = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormState((prev) => ({ ...prev, date: date }));
  };

  const handleProofChange = (file) => {
    setProofFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSpinningLoader(true);

    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      if (proofFile) {
        formData.append("proof", proofFile);
      }
      const formDataObj = Object.fromEntries(formData.entries());
      console.log(formDataObj);
      const response = await axiosInstance.post(
        `api/v1/staffAccounts/transfer-amount`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            staffAccountId,
          },
        }
      );
      setSpinningLoader(false);
      if (response.status === 200) {
        toast({
          description: "Amount transferred successfully",
        });
      }
    } catch (error) {
      setSpinningLoader(false);
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.error || "An error occurred");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.error || "An error occurred",
      });
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
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton
          disableLoadingOnClick={true}
          className="w-full md:w-max"
          icon={<Send size={16} color="#107243" />}
          txt="Transfer Amount"
          color="text-[#107243]"
          border="border border-[#107243]"
        />
      </DialogTrigger>
      <DialogContent className="bg-[#FFFBFA] border border-[#EBEBEB] w-full lg:max-w-[38rem] lg:min-w-[38rem] mx-auto p-3 sm:p-8 rounded-2xl overflow-y-scroll max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Transfer Amount</DialogTitle>
          <DialogDescription>
            Transfer amount to another staff member. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
          {errorMessage && <Message type="error" message={errorMessage} />}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 w-full">
              <StaffSelect
                handleSelectChange={handleSelectChange}
                selectedValue={formState.receiverId}
                label="Receiver"
                name="receiverId"
                placeholder="Select receiver..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label label="Amount" htmlFor="amount" />
              <Input
                placeholder="Amount"
                name="amount"
                id="amount"
                type="number"
                value={formState.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label label="Payment Method" htmlFor="paymentMethod" />
              <SelectInput
                selectValue={formState.paymentMethod}
                options={[
                  { value: "Cash", label: "Cash" },
                  { value: "Bank Transfer", label: "Bank Transfer" },
                  { value: "Cheque", label: "Cheque" },
                ]}
                onChange={(value) => handleSelectChange("paymentMethod", value)}
              />
            </div>
            <Banks
              paymentMethod={formState.paymentMethod}
              selectedBank={formState.selectedBank}
              handleSelectChange={handleSelectChange}
            />
            <div className="flex flex-col gap-1">
              <Label label="Transfer Date" htmlFor="date" />
              <DatePicker
                setHiringDate={handleDateChange}
                defaultDate={formState.date}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label label="Description" htmlFor="description" />
              <Input
                placeholder="Description"
                name="description"
                id="description"
                value={formState.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <PaymentSlip
                label="Payment Proof"
                inputId="paymentProof"
                onFileChange={handleProofChange}
                className="mb-4"
                iconClassName="w-6 h-6 mb-2 text-green-500"
              />
            </div>
            <CustomButton
              type="submit"
              loading={spinningLoader}
              icon={<Send size={20} />}
              txt="Transfer Amount"
              bg="bg-[#107243]"
              color="text-[#FFFBFA]"
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferAmount;
