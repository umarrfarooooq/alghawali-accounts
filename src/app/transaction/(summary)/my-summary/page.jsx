"use client";
import BalanceDetails from "@/components/Balance/Balance-Details";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import AuthRedirect from "@/lib/AuthRedirect";
import React from "react";
import { useMyBalanceDetails } from "@/hooks/useTransactions";
import CustomLoading from "@/components/ui/CustomLoading";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
const MySummaryPage = () => {
  const { staffAccountId } = VerifyStaffToken();
  const { data, isLoading, error } = useMyBalanceDetails({ staffAccountId });
  if (isLoading)
    return (
      <div>
        <CustomLoading fullScreen={true} />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <AuthRedirect requireAuth={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <NavigateBack currentPage="My Balance Summary" />
          <BalanceDetails data={data} />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default MySummaryPage;
