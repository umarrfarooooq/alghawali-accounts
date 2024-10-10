import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import React from "react";
import ViewDetails from "../ui/view-details";
import Link from "next/link";

const TransactionList = ({ transaction }) => {
  const formattedDate = new Date(transaction?.date).toLocaleDateString();

  return (
    <div>
      <div className="py-3">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <div className="text-xs text-[#434146]">Customer Name</div>
            <div className="text-sm text-[#434146] font-semibold">
              {transaction?.customer?.customerName
                ? transaction.customer.customerName
                : "- - - "}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">Date</div>
            <div className="text-sm text-[#434146] font-semibold">
              {formattedDate}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">Status</div>
            <div
              className={`text-sm font-semibold ${
                transaction?.status === "Approved"
                  ? "text-[#0C8B3F]"
                  : transaction?.status === "Rejected"
                  ? "text-[#f52828]"
                  : transaction?.status === "Pending"
                  ? "text-yellow-500"
                  : "text-[#434146]"
              }`}
            >
              {transaction?.status}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">Amount</div>
            <div className="text-sm text-[#434146] font-semibold flex items-center gap-1">
              {transaction?.type && (
                <span>
                  {transaction.type === "Received" && (
                    <ArrowDown size={16} color="#0C8B3F" />
                  )}
                  {transaction.type === "Sent" && (
                    <ArrowUp size={16} color="#f52828" />
                  )}
                </span>
              )}

              <span>{transaction?.amount} OMR</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#434146]">
                {transaction?.type === "Received" ? "Recieved By" : "Sent By"}
              </div>
              <div className="text-sm text-[#434146] font-semibold">
                {transaction?.type === "Received"
                  ? transaction?.receivedBy?.staffName || "Not Assigned"
                  : transaction?.sendedBy?.staffName || "Not Assigned"}
              </div>
            </div>
            <Link href={`/transaction/${transaction._id}`}>
              <ViewDetails
                item={<ArrowRight color="#0C8B3F" />}
                tooltip="View Details"
              />
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default TransactionList;
