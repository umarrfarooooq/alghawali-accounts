"use client";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import StaffTransactionsList from "@/components/Transactions/Staff-Transactions-List";
import AuthRedirect from "@/lib/AuthRedirect";
import React from "react";

const StaffTransactions = ({ params }) => {
  const { id } = params;
  return (
    <AuthRedirect requireAuth={true} fullAccess={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <NavigateBack currentPage="Transactions" />
          <StaffTransactionsList staffId={id} />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default StaffTransactions;
