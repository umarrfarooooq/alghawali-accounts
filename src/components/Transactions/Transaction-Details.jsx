"use client";
import React, { useState } from "react";
import { Check, Clock, X } from "lucide-react";
import { useTransactionById } from "@/hooks/useTransactions";
import CustomButton from "../ui/CustomBtn";
import CustomLoading from "../ui/CustomLoading";
import axiosInstance from "@/utils/axios";
import EditTransaction from "../Forms/Edit-Transaction";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import ConfirmationModal from "../ui/Modal";
import { useToast } from "@/hooks/use-toast";
const TransactionDetailsComponent = ({ id }) => {
  const { roles: staffRoles } = VerifyStaffToken();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const hasPermission = staffRoles.includes(roles.fullAccessOnAccounts);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const { data: transaction, isLoading, error } = useTransactionById(id);
  if (isLoading) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  if (error) {
    return <div>Error loading transaction details</div>;
  }
  const handleApprove = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/transaction/handlePendingTransaction",
        {
          transactionId: transaction._id,
          action: "approve",
        }
      );

      console.log("Transaction approved:", response.data);
      toast({
        title: "Transaction approved",
        description: "The transaction has been approved successfully",
      });
      setIsAcceptModalOpen(false);
    } catch (error) {
      console.error("Error approving transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/transaction/handlePendingTransaction",
        {
          transactionId: transaction._id,
          action: "decline",
        }
      );

      console.log("Transaction declined:", response.data);
      toast({
        title: "Transaction declined",
        description: "The transaction has been declined successfully",
      });
      setIsDeclineModalOpen(false);
    } catch (error) {
      console.error("Error declining transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = new Date(transaction.date).toLocaleDateString();
  return (
    <>
      <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
        <div className="py-3">
          <div className="flex justify-end">
            <CustomButton
              className="w-max mb-4"
              disableLoadingOnClick={true}
              icon={
                transaction.status === "Pending" ? (
                  <Clock size={16} color="#f29339" />
                ) : transaction.status === "Approved" ? (
                  <Check size={16} color="#0C8B3F" />
                ) : transaction.status === "Rejected" ? (
                  <X size={16} color="#f56565" />
                ) : (
                  <Check size={16} color="#107243" />
                )
              }
              txt={transaction.status}
              color={
                transaction.status === "Pending"
                  ? "text-[#f29339]"
                  : transaction.status === "Approved"
                  ? "text-[#0C8B3F]"
                  : transaction.status === "Rejected"
                  ? "text-[#f56565]"
                  : "text-[#107243]"
              }
              border={
                transaction.status === "Pending"
                  ? "border border-[#f29339]"
                  : transaction.status === "Approved"
                  ? "border border-[#0C8B3F]"
                  : transaction.status === "Rejected"
                  ? "border border-[#f56565]"
                  : "border border-[#107243]"
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-[#434146]">Customer Name</div>
              <div className="text-sm text-[#434146] font-semibold">
                {transaction.customer?.customerName || "- - -"}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#434146]">Action By</div>
              <div className="text-sm text-[#434146] font-semibold">
                {transaction.actionBy?.staffName || "- - -"}
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
                {transaction.paymentMethod}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#434146]">Amount</div>
              <div className="text-sm text-[#434146] font-semibold flex items-center gap-1">
                {transaction.status && (
                  <span>
                    {transaction.status === "Pending" && (
                      <Clock size={16} color="#f29339" />
                    )}
                    {transaction.status === "Approved" && (
                      <Check size={16} color="#0C8B3F" />
                    )}
                    {transaction.status === "Rejected" && (
                      <X size={16} color="#f56565" />
                    )}
                  </span>
                )}
                <span>{transaction.amount} OMR</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-[#434146]">Type</div>
              <div className="text-sm text-[#434146] font-semibold">
                {transaction.type}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#434146]">Description</div>
              <div className="text-sm text-[#434146] font-semibold">
                {transaction.description}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#434146]">Timestamp</div>
              <div className="text-sm text-[#434146] font-semibold">
                {new Date(transaction.timestamp).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#434146]">
                {transaction.type === "Received" ? "Received By" : "Sended By"}
              </div>
              <div className="text-sm text-[#434146] font-semibold">
                {transaction.type === "Received"
                  ? transaction.receivedBy?.staffName
                  : transaction.sendedBy?.staffName}
              </div>
            </div>
            {transaction.proof && (
              <div>
                <div className="text-xs text-[#434146]">Payment Proof</div>
                <div className="text-sm text-[#434146] font-semibold">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${process.env.NEXT_PUBLIC_API_URL}${transaction.proof}`}
                    className="cursor-pointer underline"
                  >
                    view payment proof
                  </a>
                </div>
              </div>
            )}
            {transaction.invoice?.number && (
              <div>
                <div className="text-xs text-[#434146]">Invoice Number</div>
                <div className="text-sm text-[#434146] font-semibold flex items-center gap-1">
                  {transaction.invoice?.number}{" "}
                </div>
              </div>
            )}
            {transaction.invoice?.path && (
              <div>
                <div className="text-xs text-[#434146]">Invoice PDF</div>
                <div className="text-sm text-[#434146] font-semibold flex items-center gap-1">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${process.env.NEXT_PUBLIC_API_URL}uploads/${transaction.invoice?.path}`}
                    className="cursor-pointer underline "
                  >
                    view invoice
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        {hasPermission && (
          <div className="flex justify-end gap-2 mt-4">
            {transaction.status === "Pending" && (
              <>
                <CustomButton
                  onClick={() => setIsAcceptModalOpen(true)}
                  className="w-full md:w-max"
                  disableLoadingOnClick={true}
                  icon={<Check size={16} color="#107243" />}
                  txt="Approve"
                  color="text-[#107243]"
                  border="border border-[#107243]"
                />
                <CustomButton
                  onClick={() => setIsDeclineModalOpen(true)}
                  className="w-full md:w-max"
                  disableLoadingOnClick={true}
                  icon={<X size={16} color="#f56565" />}
                  txt="Decline"
                  color="text-[#f56565]"
                  border="border border-[#f56565]"
                />
              </>
            )}

            {hasPermission && <EditTransaction transaction={transaction} />}
            <ConfirmationModal
              isOpen={isAcceptModalOpen}
              onClose={() => setIsAcceptModalOpen(false)}
              onConfirm={handleApprove}
              loading={loading}
              title="Approve Transaction"
              description="Are you sure you want to approve this transaction?"
              confirmText="Approve"
              confirmClass="bg-[#107243] hover:bg-[#107243]"
              cancelText="Cancel"
            />
            <ConfirmationModal
              isOpen={isDeclineModalOpen}
              onClose={() => setIsDeclineModalOpen(false)}
              onConfirm={handleDecline}
              loading={loading}
              title="Decline Transaction"
              description="Are you sure you want to decline this transaction?"
              confirmText="Decline"
              confirmClass="bg-[#f56565] hover:bg-[#f56565]"
              cancelText="Cancel"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionDetailsComponent;
