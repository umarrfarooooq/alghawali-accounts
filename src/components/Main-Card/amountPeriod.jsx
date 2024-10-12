import React, { useState } from "react";
import { format } from "date-fns";
import SelectInput from "../ui/Select-Input";
import DateRangePicker from "./Date-Range";

const AmountPeriod = ({ onPeriodChange, selectedPeriod, startDate, endDate }) => {
  const [date, setDate] = useState({
    from: startDate,
    to: endDate,
  });

  const handleSelectChange = (value) => {
    if (value === "custom") {
      onPeriodChange({ type: "custom" });
    } else {
      setDate({ from: undefined, to: undefined });
      onPeriodChange({ type: "period", period: value });
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      onPeriodChange({
        type: "dateRange",
        startDate: format(newDate.from, "yyyy-MM-dd"),
        endDate: format(newDate.to, "yyyy-MM-dd"),
      });
    }
  };

  return (
    <span className="flex flex-col gap-2 items-end w-full">
      <SelectInput
        className="mb-2 h-10 w-full md:max-w-80"
        selectValue={selectedPeriod}
        onChange={handleSelectChange}
        options={[
          { value: "Weekly", label: "Weekly" },
          { value: "Monthly", label: "Monthly" },
          { value: "Yearly", label: "Yearly" },
          { value: "custom", label: "Custom Range" },
        ]}
      />
      {selectedPeriod === "custom" && (
        <div>
          <DateRangePicker
            date={date}
            startDate={startDate}
            endDate={endDate}
            setDate={handleDateChange}
            className=""
          />
        </div>
      )}
    </span>
  );
};

export default AmountPeriod;
