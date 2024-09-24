"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const NavigateBack = ({ currentPage, actions, actionBtn1, actionBtn2 }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="p-4 md:p-6 rounded-xl border border-[#F4F1EB] bg-[#FFFBFA] flex items-center justify-between gap-5">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="cursor-pointer" onClick={handleBack}>
        <ChevronLeft />
        </div>
        <div className="text-sm md:text-lg font-semibold">{currentPage}</div>
      </div>
      {actions && <div className="flex items-center gap-4">
      {actionBtn1 && actionBtn1}
      {actionBtn2 && actionBtn2}
      
      </div>}
      
    </div>
  );
};

export default NavigateBack;