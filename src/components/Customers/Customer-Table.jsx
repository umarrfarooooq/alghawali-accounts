import { ArrowRight, Dot } from "lucide-react";
import React from "react";
import ViewDetails from "../ui/view-details";
import Link from "next/link";
const CustomerTable = ({ customer }) => {
  return (
    <div className="bg-[#F2F2F2] relative rounded-md min-h-[4.25rem] border border-[#C3D0D4]">
      <div className="absolute -top-3 left-3">
        <div className="text-xs flex items-center gap-2 font-medium px-2 py-1 rounded-lg border border-[#C3D0D4] bg-[#F2F2F2]">
          {customer.profileHiringStatus === "On Trial" && (
            <span
              className={`h-2 w-2 rounded-full ${
                customer.trialStatus === "Active"
                  ? "bg-[#0C8B3F]"
                  : "bg-[#FF4646]"
              }`}
            ></span>
          )}

          <span>{customer.profileHiringStatus}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-start">
          <div>
            <div className="text-xs text-[#434146]">Customer Name</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.customerName}
            </div>
          </div>
          {/* <div>
            <div className="text-xs text-[#434146]">Phone Number</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.phoneNo}
            </div>
          </div> */}
          <div>
            <div className="text-xs text-[#434146]">Last Transaction Date</div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.transactions && customer.transactions.length > 0
                ? new Date(customer.transactions[customer.transactions.length - 1].date).toLocaleDateString()
                : 'No transactions'}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">
              {customer.profileHiringStatus === "Return"
                ? "Refunded Amount"
                : "Total Amount"}
            </div>
            <div className="text-sm text-[#434146] font-semibold">
              {customer.profileHiringStatus === "Return"
                ? customer.returnAmount + customer.pendingReturnAmount
                : customer.totalAmount}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">
              {customer.profileHiringStatus === "Return"
                ? "Remaining Amount"
                : "Recieved Amount"}
            </div>
            <div className="text-sm text-[#434146] font-semibold flex items-center gap-1">
              {customer.receivedAmount + customer.pendingReceivedAmount}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#434146]">Profile Name</div>
              <div className="text-sm text-[#434146] font-semibold">
                {customer.maid.name}
              </div>
            </div>
            <div>
              <Link href={`/customer/${customer._id}`}>
                <ViewDetails
                  item={<ArrowRight color="#0C8B3F" />}
                  tooltip="View Details"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
