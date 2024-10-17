import React from "react";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import DateRangePicker from "@/components/Main-Card/Date-Range";

const AnalyticsHeader = ({ currentPage, dateRange, handleDateRangeChange }) => {
  return (
    <NavigateBack
      currentPage={currentPage}
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
  );
};

export default AnalyticsHeader;
