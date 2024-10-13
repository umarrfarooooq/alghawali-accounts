import React from "react";
import { formatDate, formatExpirationTime } from "@/utils/formatDate";
import CustomButton from "../ui/CustomBtn";

const CustomerDetailsData = ({ customer }) => {
  if (!customer) return null;

  return (
    <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
      <div className="py-3">
        <div className="flex justify-end">
          <CustomButton
            className="w-max mb-4"
            loading={false}
            disableLoadingOnClick={true}
            txt={customer.profileHiringStatus}
            border="border border-[#107243]"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-[#434146]">Customer Name</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.customerName}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">Phone Number</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.phoneNo}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">Maid Name</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.maid?.name} ({customer.maid?.code})
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">Staff</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.staff?.staffName} ({customer.staff?.staffCode})
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">Total Amount</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.totalAmount} OMR
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">
              {customer.profileHiringStatus !== "Return"
                ? "Received Amount"
                : "Remaining Amount"}
            </div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.receivedAmount + customer.pendingReceivedAmount} OMR
            </div>
          </div>

          <div>
            <div className="text-xs text-[#434146]">Unique Code</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.uniqueCode}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">
              Customer Payment Status
            </div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.cosPaymentStatus}
            </div>
          </div>
          {customer.officeCharges > 0 && (
            <div>
              <div className="text-xs text-[#434146]">Office Charges</div>
              <div className="text-sm text-[#434146] font-semibold">
                {customer.officeCharges}
              </div>
            </div>
          )}
          {customer.returnAmount + customer.pendingReturnAmount > 0 && (
            <div>
              <div className="text-xs text-[#434146]">Return Amount</div>
              <div className="text-sm text-[#434146] font-semibold">
                {customer.returnAmount + customer.pendingReturnAmount}
              </div>
            </div>
          )}
          {customer.visaChangeAmount > 0 && (
            <div>
              <div className="text-xs text-[#434146]">Visa Change Amount</div>
              <div className="text-sm text-[#434146] font-semibold">
                {customer.visaChangeAmount}
              </div>
            </div>
          )}
          {customer.uniformAmount > 0 && (
            <div>
              <div className="text-xs text-[#434146]">Uniform Amount</div>
              <div className="text-sm text-[#434146] font-semibold">
                {customer.uniformAmount}
              </div>
            </div>
          )}
          {customer.profileHiringStatus === "On Trial" && (
            <>
              <div>
                <div className="text-xs text-[#434146]">Trial Start Date</div>
                <div className="text-sm text-[#434146] font-semibold">
                  {formatDate(customer.trialStartDate)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#434146]">Trial End Date</div>
                <div className="text-sm text-[#434146] font-semibold">
                  {formatDate(customer.trialEndDate)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#434146]">Trial Status</div>
                <div
                  className={`text-sm font-semibold ${
                    customer.trialStatus === "Active"
                      ? "text-[#107243]"
                      : "text-[#FF0000]"
                  }`}
                >
                  {customer.trialStatus}
                  {customer.trialStatus === "Expired" && (
                    <span className="text-[#FF0000]">
                      {" "}
                      (Expired {formatExpirationTime(customer.trialEndDate)})
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
          {customer.profileHiringStatus === "Monthly Hired" && (
            <>
              <div>
                <div className="text-xs text-[#434146]">
                  Monthly Hiring Duration
                </div>
                <div className="text-sm text-[#434146] font-semibold">
                  {customer.monthlyHiringDuration} Months
                </div>
              </div>
              <div>
                <div className="text-xs text-[#434146]">Month Start Date</div>
                <div className="text-sm text-[#434146] font-semibold">
                  {formatDate(customer.monthlyHireStartDate)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#434146]">Month End Date</div>
                <div className="text-sm text-[#434146] font-semibold">
                  {formatDate(customer.monthlyHireEndDate)}
                  {new Date(customer.monthlyHireEndDate) < new Date() && (
                    <span className="text-[#FF0000]">
                      {" "}
                      (Expired{" "}
                      {formatExpirationTime(customer.monthlyHireEndDate)})
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsData;
