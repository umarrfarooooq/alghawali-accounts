"use client";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import TransactionDetailsComponent from "@/components/Transactions/Transaction-Details";
import AuthRedirect from "@/lib/AuthRedirect";
import React from "react";

const TransactionDetails = ({ params }) => {
  return (
    <AuthRedirect requireAuth={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <NavigateBack currentPage="Transaction Details" />
          <TransactionDetailsComponent id={params.id} />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default TransactionDetails;
