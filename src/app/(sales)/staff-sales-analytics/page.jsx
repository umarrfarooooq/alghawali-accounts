"use client";
import { useStaffAnalytics } from "@/hooks/useCustomers";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import AuthRedirect from "@/lib/AuthRedirect";
import React, { useState } from "react";
import DateRangePicker from "@/components/Main-Card/Date-Range";
import StaffSalesAnalysis from "@/components/Analytics/Staff-Sales-Analysis";
import CustomLoading from "@/components/ui/CustomLoading";

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
          <NavigateBack
            currentPage="Staff Sales Analytics"
            actions={true}
            actionBtn1={
              <DateRangePicker
                date={dateRange}
                setDate={handleDateRangeChange}
                startDate={dateRange.from}
                endDate={dateRange.to}
              />
            }
          />
          <StaffSalesAnalysis staffAnalytics={staffAnalytics} />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default StaffSalesAnalyticsPage;
