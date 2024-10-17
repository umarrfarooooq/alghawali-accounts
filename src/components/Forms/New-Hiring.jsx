"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MaidSearch } from "../New-Hiring/Search-Maid";
import SelectInput from "../ui/Select-Input";
import { DatePicker } from "../New-Hiring/Date-Picker";
import PaymentSlip from "../New-Hiring/PaymentSlip";
import Banks from "../New-Hiring/Banks";
import CustomButton from "../ui/CustomBtn";
import RecievedBy from "../Form-Components/Recieved-By";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import Message from "../ui/Message";
import { useToast } from "@/hooks/use-toast";
import ServicesSelection from "../Form-Components/ServicesSelection";
const NewHiredForm = () => {
  const { verifyToken, staffAccountId } = VerifyStaffToken();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedMaidId, setSelectedMaidId] = useState("");
  const [hiringType, setHiringType] = useState("On Trial");
  const [hiringDate, setHiringDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [spinningLoader, setSpinningLoader] = useState(false);
  const [formState, setFormState] = useState({
    paymentMethod: "",
    receivedBy: "",
    selectedBank: "",
    agencyType: "Alghawali",
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  useEffect(() => {
    if (totalAmount - advanceAmount >= 0) {
      setRemainingAmount(totalAmount - advanceAmount);
    }
  }, [totalAmount, advanceAmount]);
  const handleSelectChange = (name, value) => {
    if (name === "totalAmount") {
      setTotalAmount(Number(value));
    } else if (name === "advanceAmount") {
      setAdvanceAmount(Number(value));
    }
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSpinningLoader(true);

    if (!selectedMaidId) {
      setSpinningLoader(false);
      return setErrorMessage("Please Select Valid Maid Profile");
    }
    console.log(staffAccountId);

    const formData = new FormData(e.currentTarget);
    formData.append("hiringDate", hiringDate);
    formData.append("staffAccount", staffAccountId);
    if (hiringType === "Monthly") {
      formData.append("isMonthlyHiring", true);
    } else if (hiringType === "On Trial") {
      formData.append("isTrial", true);
    }

    const formDataObject = {
      ...Object.fromEntries(formData.entries()),
      ...formState,
    };
    console.log(formDataObject);

    try {
      const response = await axiosInstance.post(
        `/api/v2/hiring/${selectedMaidId}`,
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${verifyToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Successfully hired");
        console.log(response);
        toast({
          title: "Success",
          variant: "success",
          description: "Successfully hired and redirecting to transaction",
        });
        setTimeout(() => {
          const transactionId =
            response?.data?.savedCustomerAccount?.transactions[0];
          router.push(`/transaction/${transactionId}`);
        }, 1000);
      }
      setSpinningLoader(false);
    } catch (error) {
      setSpinningLoader(false);

      if (error.response) {
        if (error.response.status === 400) {
          if (
            error.response.data.errors &&
            Array.isArray(error.response.data.errors)
          ) {
            setErrorMessage(error.response.data.errors.join(", "));
          } else if (error.response.data.error) {
            setErrorMessage(error.response.data.error);
            toast({
              variant: "destructive",
              title: "Error",
              description: error.response.data.error,
            });
          } else {
            setErrorMessage("Validation error. Please check your input.");
            toast({
              variant: "destructive",
              title: "Error",
              description: "Validation error. Please check your input.",
            });
          }
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
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred. Please try again.",
        });
      }

      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="bg-[#FFFBFA] border border-[#EBEBEB] w-full lg:max-w-[38rem] lg:min-w-[38rem] mx-auto p-3 sm:p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-semibold">Hiring Maid</div>
        </div>

        <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
          {errorMessage && <Message type="error" message={errorMessage} />}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <div>
              <RadioGroup
                defaultValue="On Trial"
                onValueChange={(value) => setHiringType(value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-lg border border-[#C3D0D4] bg-[#FFFBFA]"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Monthly"
                    id="Monthly"
                    className="border-[#031D92] border-2 text-[#031D92]"
                  />
                  <Label
                    htmlFor="Monthly"
                    label="Monthly"
                    className="font-bold"
                  ></Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="On Trial"
                    id="On Trial"
                    className="border-[#031D92] border-2 text-[#031D92]"
                  />
                  <Label
                    htmlFor="On Trial"
                    label="On Trial"
                    className="font-bold"
                  ></Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Hired"
                    id="Hired"
                    className="border-[#031D92] border-2 text-[#031D92]"
                  />
                  <Label
                    htmlFor="Hired"
                    label="Hired"
                    className="font-bold"
                  ></Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label label="Select Maid" />
              <MaidSearch
                onMaidSelect={(maid) => setSelectedMaidId(maid._id)}
                apiEndpoint="api/v1/maids/"
                placeholder="Search maid for hiring..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label label="Customer Name" htmlFor="fullName" />
              <Input placeholder="Full Name" name="fullName" id="fullName" />
            </div>
            <div className="flex flex-col gap-1">
              <Label label="Customer Phone #" htmlFor="cosPhone" />
              <Input placeholder="Phone Number" name="cosPhone" id="cosPhone" />
            </div>
            <div className="flex flex-col gap-1">
              <Label label="Total Amount" htmlFor="totalAmount" />
              <Input
                placeholder="Total Amount"
                name="totalAmount"
                id="totalAmount"
                type="number"
                onChange={(e) =>
                  handleSelectChange("totalAmount", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label label="Advance Amount" htmlFor="advanceAmount" />
              <Input
                placeholder="Advance Amount"
                name="advanceAmount"
                id="advanceAmount"
                type="number"
                onChange={(e) =>
                  handleSelectChange("advanceAmount", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label label="Remaining Amount" htmlFor="remainingAmount" />
              <Input
                id="remainingAmount"
                value={remainingAmount >= 0 ? remainingAmount : ""}
                type="remainingAmount"
                readOnly={true}
                className="text-gray-600"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex flex-col gap-1 w-full">
                <Label label="Payment Method" htmlFor="paymentMethod" />
                <SelectInput
                  selectValue={formState.paymentMethod}
                  options={[
                    { value: "Cash", label: "Cash" },
                    { value: "Bank Transfer", label: "Bank Transfer" },
                    { value: "Cheque", label: "Cheque" },
                  ]}
                  onChange={(value) =>
                    handleSelectChange("paymentMethod", value)
                  }
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <RecievedBy
                  handleSelectChange={handleSelectChange}
                  receivedValue={formState.receivedBy}
                />
              </div>
            </div>
            <Banks
              paymentMethod={formState.paymentMethod}
              selectedBank={formState.selectedBank}
              handleSelectChange={handleSelectChange}
            />

            <div className="flex flex-col gap-1">
              <Label label="Hiring Date" htmlFor="hiringDate" />
              <DatePicker setHiringDate={setHiringDate} />
            </div>
            {hiringType === "Monthly" && (
              <div className="flex flex-col gap-1">
                <Label
                  label="Monthly Hiring Duration In Months"
                  htmlFor="monthlyHiringDuration"
                />
                <Input
                  placeholder="Duration In Months"
                  name="monthlyHiringDuration"
                  id="monthlyHiringDuration"
                  type="number"
                />
              </div>
            )}
            {hiringType === "On Trial" && (
              <div className="flex flex-col gap-1">
                <Label label="Trial Duration In Days" htmlFor="trialDuration" />
                <Input
                  placeholder="Duration In Days"
                  name="trialDuration"
                  id="trialDuration"
                  type="number"
                />
              </div>
            )}
            {hiringType === "On Trial" && (
              <div className="flex flex-col gap-1">
                <Label label="Passport Number" htmlFor="passportNumber" />
                <Input
                  placeholder="Passport Number"
                  name="passportNumber"
                  id="passportNumber"
                  type="text"
                />
              </div>
            )}
            {hiringType === "On Trial" && (
              <div className="flex flex-col gap-1">
                <Label
                  label="Customer Id Card Number"
                  htmlFor="customerIdCard"
                />
                <Input
                  placeholder="Customer Id Card Number"
                  name="customerIdCard"
                  id="customerIdCard"
                  type="text"
                />
              </div>
            )}
            {hiringType === "On Trial" && (
              <div className="flex flex-col gap-1">
                <Label label="Salary" htmlFor="salary" />
                <Input
                  placeholder="Salary"
                  name="salary"
                  id="salary"
                  type="number"
                />
              </div>
            )}
            {hiringType === "On Trial" && (
              <div className="flex flex-col gap-1">
                <Label label="Agency Type" htmlFor="agencyType" />
                <SelectInput
                  selectValue={formState.agencyType}
                  options={[
                    { value: "Alghawali", label: "Alghawali" },
                    { value: "Swift", label: "Swift" },
                  ]}
                  onChange={(value) => handleSelectChange("agencyType", value)}
                />
              </div>
            )}
            <ServicesSelection />
            <div>
              <PaymentSlip />
            </div>
            <CustomButton
              type="submit"
              loading={spinningLoader}
              icon={<Save size={20} />}
              txt="Save & Continue to Invoice.."
              bg="bg-[#107243]"
              color="text-[#FFFBFA]"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewHiredForm;
