"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Save } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import SelectInput from "../ui/Select-Input";
import { DatePicker } from "../New-Hiring/Date-Picker";
import PaymentSlip from "../New-Hiring/PaymentSlip";
import Banks from "../New-Hiring/Banks";
import CustomButton from "../ui/CustomBtn";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import StaffSelect from "../Form-Components/StaffSelect";
import Message from "../ui/Message";
import { useToast } from "@/hooks/use-toast";
import { CustomerSearch } from "../Form-Components/Select-Customer";
import roles from "@/lib/roles";
const UpdatePaymentForm = () => {
  const { verifyToken, staffAccountId, roles: staffRoles } = VerifyStaffToken();
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [paymentDate, setPaymentDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [spinningLoader, setSpinningLoader] = useState(false);
  const [formState, setFormState] = useState({
    paymentMethod: "",
    receiverOrSenderId: "",
    selectedBank: "",
    paymentType: "receive",
  });
  const { toast } = useToast();
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [customerTotalAmount, setCustomerTotalAmount] = useState(0);
  const [customerReceivedAmount, setCustomerReceivedAmount] = useState(0);
  const hasFullAccess = staffRoles.includes(roles.fullAccessOnAccounts);
  useEffect(() => {
    if (formState.paymentType === "receive") {
      const remainingAmount = customerTotalAmount - customerReceivedAmount;
      if (paymentAmount > remainingAmount) {
        setWarningMessage(
          "Warning: Payment amount exceeds the remaining balance."
        );
      } else {
        setWarningMessage("");
      }
    } else if (formState.paymentType === "refund") {
      if (paymentAmount > customerReceivedAmount) {
        setWarningMessage(
          "Warning: Refund amount exceeds the total received amount."
        );
      } else {
        setWarningMessage("");
      }
    }
  }, [
    paymentAmount,
    customerTotalAmount,
    customerReceivedAmount,
    formState.paymentType,
  ]);

  const handleSelectChange = useCallback((name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleCustomerSelect = async (customer) => {
    setSelectedCustomerId(customer._id);
    try {
      const response = await axiosInstance.get(
        `api/v2/customers/customer-account-for-customer/${customer._id}`,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
          },
        }
      );
      const {
        totalAmount,
        receivedAmount,
        pendingReceivedAmount,
        profileHiringStatus,
      } = response.data;

      setCustomerTotalAmount(totalAmount);
      const totalReceived = receivedAmount + pendingReceivedAmount;
      setCustomerReceivedAmount(totalReceived);

      let paymentType;
      if (profileHiringStatus === "Return") {
        paymentType = "refund";
        setPaymentAmount(totalReceived);
      } else {
        paymentType = totalReceived > totalAmount ? "refund" : "receive";
        totalReceived > totalAmount
          ? setPaymentAmount(totalReceived - totalAmount)
          : setPaymentAmount(totalAmount - totalReceived);
      }

      setFormState((prev) => ({
        ...prev,
        paymentType: paymentType,
      }));
    } catch (error) {
      console.error("Error fetching customer account details:", error);
      setErrorMessage(
        "Error fetching customer account details. Please try again."
      );
    }
  };

  const PaymentFields = useMemo(() => {
    return (
      <>
        <div className="flex flex-col gap-1 w-full">
          <Label label="Payment Type" htmlFor="paymentType" />
          <Input
            value={formState.paymentType === "receive" ? "Receive" : "Refund"}
            readOnly
            className="text-gray-500"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex flex-col gap-1 w-full">
            <StaffSelect
              handleSelectChange={handleSelectChange}
              selectedValue={formState.receiverOrSenderId}
              label={
                formState.paymentType === "receive" ? "Received By" : "Sent By"
              }
              name="receiverOrSenderId"
              placeholder={`Select ${
                formState.paymentType === "receive" ? "receiver" : "sender"
              }...`}
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
        </div>
        <Banks
          staffName={formState.receiverOrSenderId}
          paymentMethod={formState.paymentMethod}
          selectedBank={formState.selectedBank}
          handleSelectChange={handleSelectChange}
        />
        <div>
          <PaymentSlip />
        </div>
      </>
    );
  }, [
    formState.paymentType,
    formState.paymentMethod,
    formState.receiverOrSenderId,
    handleSelectChange,
  ]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSpinningLoader(true);

    if (!selectedCustomerId) {
      setSpinningLoader(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please Select a Valid Customer",
      });
      return setErrorMessage("Please Select a Valid Customer");
    }

    const formData = new FormData(e.currentTarget);
    formData.append("paymentDate", paymentDate);
    formData.append("staffAccount", staffAccountId);
    formData.append("customerId", selectedCustomerId);

    const formDataObject = {
      ...Object.fromEntries(formData.entries()),
      ...formState,
    };

    console.log(formDataObject);

    try {
      const response = await axiosInstance.post(
        `api/v2/hiring/update-payment`,
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast({
          description: "Payment updated successfully",
        });
      }
      setSpinningLoader(false);
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
    <div className="bg-[#FFFBFA] border border-[#EBEBEB] w-full lg:max-w-[38rem] lg:min-w-[38rem] mx-auto p-3 sm:p-8 rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="text-2xl font-semibold">Update Payment</div>
      </div>

      <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
        {errorMessage && <Message type="error" message={errorMessage} />}
        {warningMessage && <Message type="warning" message={warningMessage} />}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <div>
            <Label label="Select Customer" />
            <CustomerSearch
              onCustomerSelect={handleCustomerSelect}
              apiEndpoint={
                hasFullAccess
                  ? "api/v2/customers/active-customers"
                  : "api/v2/customers/active-customers-for-user"
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label label="Payment Amount" htmlFor="paymentAmount" />
            <Input
              placeholder="Payment Amount"
              name="paymentAmount"
              id="paymentAmount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label label="Payment Date" htmlFor="paymentDate" />
            <DatePicker setHiringDate={setPaymentDate} />
          </div>
          <div className="flex flex-col gap-1">
            <Label label="Description (Optional)" htmlFor="description" />
            <Input
              placeholder="Description"
              name="description"
              id="description"
            />
          </div>
          {PaymentFields}
          <CustomButton
            type="submit"
            loading={spinningLoader}
            icon={<Save size={20} />}
            txt="Save & Process Payment"
            bg="bg-[#107243]"
            color="text-[#FFFBFA]"
          />
        </form>
      </div>
    </div>
  );
};

export default React.memo(UpdatePaymentForm);
