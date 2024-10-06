"use client";
import BalanceDetails from "@/components/Balance/Balance-Details";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import AuthRedirect from "@/lib/AuthRedirect";
import React from "react";
import { useStaffBalanceDetails } from "@/hooks/useTransactions";
import CustomLoading from "@/components/ui/CustomLoading";
const StaffSummaryPage = ({ params }) => {
  const { data, isLoading, error } = useStaffBalanceDetails(params.id);
  if (isLoading)
    return (
      <div>
        <CustomLoading fullScreen={true} />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);
  return (
    <AuthRedirect requireAuth={true} fullScreen={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <NavigateBack currentPage="Staff Balance Summary" />
          <BalanceDetails data={data} />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default StaffSummaryPage;
