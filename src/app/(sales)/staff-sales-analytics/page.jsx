"use client";
import { useStaffAnalytics } from "@/hooks/useCustomers";
import AuthRedirect from "@/lib/AuthRedirect";
import React, { useState } from "react";
import StaffSalesAnalysis from "@/components/Analytics/Staff-Sales-Analysis";
import CustomLoading from "@/components/ui/CustomLoading";
import AnalyticsHeader from "@/components/Analytics/Analytics-Header";
const StaffSalesAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const {
    data: staffAnalytics,
    isLoading,
    error,
  } = useStaffAnalytics(dateRange.from, dateRange.to, { enabled: true });

  const handleDateRangeChange = (range) => {
    setDateRange({ from: range?.from, to: range?.to });
  };

  if (isLoading)
    return (
      <div>
        <CustomLoading fullScreen={true} />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <AuthRedirect requireAuth={true} fullAccess={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <AnalyticsHeader
            currentPage="Staff Sales Analytics"
            dateRange={dateRange}
            handleDateRangeChange={handleDateRangeChange}
          />
          {staffAnalytics && (
            <StaffSalesAnalysis staffAnalytics={staffAnalytics} />
          )}
        </div>
      </div>
    </AuthRedirect>
  );
};

export default StaffSalesAnalyticsPage;
