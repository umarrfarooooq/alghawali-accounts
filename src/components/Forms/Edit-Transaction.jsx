"use client";
import React, { useState, useEffect } from "react";
import CustomButton from "../ui/CustomBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Save, X } from "lucide-react";
import Input from "../ui/Input";
import Label from "../ui/Label";
import SelectInput from "../ui/Select-Input";
import { DatePicker } from "../New-Hiring/Date-Picker";
import Banks from "../New-Hiring/Banks";
import PaymentSlip from "../New-Hiring/PaymentSlip";
import StaffSelect from "../Form-Components/StaffSelect";
import axiosInstance from "@/utils/axios";
import { toast } from "@/hooks/use-toast";

const EditTransaction = ({ transaction }) => {
  const [formState, setFormState] = useState(() => {
    let paymentMethod = transaction.paymentMethod;
    let selectedBank = transaction.selectedBank || "";

    if (paymentMethod.includes("(")) {
      const [method, bank] = paymentMethod.split("(");
      paymentMethod = method.trim();
      selectedBank = bank.replace(")", "").trim();
    }

    return {
      amount: transaction.amount,
      paymentMethod: paymentMethod,
      type: transaction.type,
      date: transaction.date,
      description: transaction.description,
      proof: transaction.proof,
      receivedBy: transaction.receivedBy?.staffName,
      sendedBy: transaction.sendedBy?.staffName,
      selectedBank: selectedBank,
    };
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
      const submitPaymentMethod =
        formState.paymentMethod === "Bank Transfer"
          ? `${formState.paymentMethod} (${formState.selectedBank})`
          : formState.paymentMethod;

      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      formData.append("paymentMethod", submitPaymentMethod);
      if (proofFile) {
        formData.append("proof", proofFile);
      }
      formData.append("transactionId", transaction._id);
      const formDataToSend = Object.fromEntries(formData.entries());
      const response = await axiosInstance.put(
        `api/v1/transaction/editTransaction`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSpinningLoader(false);
      if (response.status === 200) {
        toast({
          description: "Payment updated successfully",
        });
      }
    } catch (error) {
      setSpinningLoader(false);
      handleError(error);
    }
  };
  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        setErrorMessage(
          error.response.data.error ||
            "Validation error. Please check your input."
        );
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response.data.error,
        });
      } else if (error.response.status === 401) {
        setErrorMessage("Unauthorized. Please log in again.");
      } else if (error.response.status === 404) {
        setErrorMessage("Something not found. Please try again.");
      } else if (error.response.status === 500) {
        setErrorMessage("Server error. Please try again later.");
      } else {
        setErrorMessage(
          `An error occurred: ${
            error.response.data.message || "Please try again."
          }`
        );
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response.data.message || "Please try again.",
        });
      }
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
          icon={<Pencil size={16} color="#107243" />}
          txt="Edit"
          color="text-[#107243]"
          border="border border-[#107243]"
        />
      </DialogTrigger>
      <DialogContent className="bg-[#FFFBFA] border border-[#EBEBEB] w-full lg:max-w-[38rem] lg:min-w-[38rem] mx-auto p-3 sm:p-8 rounded-2xl overflow-y-scroll max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Make changes to your transaction here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
          {errorMessage && (
            <div
              className="p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-1 w-full">
              <StaffSelect
                handleSelectChange={handleSelectChange}
                selectedValue={
                  formState.type === "Received"
                    ? formState.receivedBy
                    : formState.sendedBy
                }
                label={formState.type === "Received" ? "Received By" : "Sent By"}
                name={formState.type === "Received" ? "receivedBy" : "sendedBy"}
                placeholder={`Select ${
                  formState.type === "Received" ? "receiver" : "sender"
                }...`}
              />
            </div>
            <Banks
              paymentMethod={formState.paymentMethod}
              selectedBank={formState.selectedBank}
              handleSelectChange={handleSelectChange}
            />
            <div className="flex flex-col gap-1">
              <Label label="Transaction Date" htmlFor="date" />
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
                initialPreview={
                  transaction.proof
                    ? `${process.env.NEXT_PUBLIC_API_URL}${transaction.proof}`
                    : null
                }
              />
            </div>
            <CustomButton
              type="submit"
              loading={spinningLoader}
              icon={<Save size={20} />}
              txt="Save Changes"
              bg="bg-[#107243]"
              color="text-[#FFFBFA]"
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransaction;
