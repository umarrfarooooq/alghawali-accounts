import React from "react";
import CustomButton from "@/components/ui/CustomBtn";
import { Plus, Repeat1, BedSingle, BatteryWarning } from "lucide-react";
const ActionBar = () => {
  return (
    <div className="px-4 md:px-8">
      <div className="flex flex-col gap-4 tab:flex-row tab:items-center justify-between md:px-6 px-4 py-4 rounded-xl bg-[#FFFBFA] border border-[#031d921a]">
        <div className="text-3xl font-bold">Accounts</div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex gap-2 flex-col xs:flex-row">
            <CustomButton
              link="new-hiring"
              icon={<BedSingle size={20} />}
              className="w-full md:w-max"
              txt="New Hiring"
              color="text-[#107243]"
              border="border border-[#107243]"
            />
            <CustomButton
              link="return"
              icon={<BatteryWarning size={20} />}
              txt="Return Maid"
              className="w-full md:w-max"
              color="text-[#107243]"
              border="border border-[#107243]"
            />
          </div>
          <div>
            <CustomButton
              link="replace"
              icon={<Repeat1 size={20} />}
              txt="Replace Maid"
              color="text-[#107243]"
              border="border border-[#107243]"
            />
          </div>
          <div>
            <CustomButton
              link="update-payment"
              icon={<Plus size={20} />}
              txt="Add New Transaction"
              bg="bg-[#107243]"
              color="text-[#FFFBFA]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
