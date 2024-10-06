import { Wallet } from "lucide-react";
import React from "react";
import CustomButton from "../ui/CustomBtn";
const StaffAccount = ({ name, bg, svg, svgBg, amount, id }) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        bg ? bg : "bg-[#F2F2F2]"
      } text-[#262F32] border border-[#E3E3E3] flex flex-col gap-6`}
    >
      <div className={`flex items-start gap-4`}>
        <div
          className={`p-3 rounded-2xl ${svgBg ? svgBg : "bg-[#031D92]"} w-max`}
        >
          {svg ? svg : <Wallet color="#F2F2F2" />}
        </div>
        <div>
          <div className="text-sm font-bold">{name}</div>
          <div className="text-2xl font-bold flex items-center gap-1">
            {amount}{" "}
            <span className="text-xs font-normal text-[#434146]">OMR</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <CustomButton
          txt="View Transactions"
          link={`/transaction/staff/${id}`}
          color="text-[#107243]"
          border="border border-[#107243]"
        />
        <CustomButton
          txt="View Balance Details"
          link={`/transaction/staff-summary/${id}`}
          color="text-[#107243]"
          border="border border-[#107243]"
        />
      </div>
    </div>
  );
};

export default StaffAccount;
