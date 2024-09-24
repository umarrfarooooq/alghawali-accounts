"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ setHiringDate, defaultDate }) {
  const [date, setDate] = useState(defaultDate || null);
  const [open, setOpen] = useState(false);

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    let formattedDate;

    if (selectedDate instanceof Date) {
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      formattedDate = `${month}-${day}-${year}`;
      setHiringDate(formattedDate);
    } else if (typeof selectedDate === "string") {
      const [year, month, day] = selectedDate.split("-");
      formattedDate = `${month}-${day}-${year}`;
      setHiringDate(formattedDate);
    }

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-full bg-[#E3E3E3] filter flex items-center justify-start border border-[#C3D0D4] h-[4rem] outline-none rounded-lg px-4 py-2 text-left",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
