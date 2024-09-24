import { ArrowRight, Check, Clock, X } from "lucide-react";
import React from "react";
import ViewDetails from "../ui/view-details";
import Link from "next/link";

const TransactionList = ({ transaction, type }) => {
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
            <div className="text-xs text-[#434146]">Payment Method</div>
            <div className="text-sm text-[#434146] font-semibold">
              {transaction?.paymentMethod}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#434146]">Amount</div>
            <div className="text-sm text-[#434146] font-semibold flex items-center gap-1">
              {transaction?.status && (
                <span>
                  {transaction.status === "Pending" && (
                    <Clock size={16} color="#f29339" />
                  )}
                  {transaction.status === "Approved" && (
                    <Check size={16} color="#0C8B3F" />
                  )}
                  {transaction.status === "Declined" && (
                    <X size={16} color="#f56565" />
                  )}
                </span>
              )}

              <span>{transaction?.amount} OMR</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#434146]">Recieved By</div>
              <div className="text-sm text-[#434146] font-semibold">
                {transaction?.receivedBy?.staffName}
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
