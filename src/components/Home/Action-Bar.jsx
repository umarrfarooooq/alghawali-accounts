import React from "react";
import CustomButton from "@/components/ui/CustomBtn";
import { Plus } from "lucide-react";
const ActionBar = () => {
  return (
    <div className="px-4 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between md:px-6 px-4 py-4 rounded-xl bg-[#FFFBFA] border border-[#031d921a]">
        <div className="text-3xl font-bold">Accounts</div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex gap-2">
            <CustomButton
              link="new-hiring"
              txt="New Hiring"
              color="text-[#107243]"
              border="border border-[#107243]"
            />
            <CustomButton
              txt="List Again"
              color="text-[#107243]"
              border="border border-[#107243]"
            />
          </div>
          <div>
            <CustomButton
              icon={<Plus size={20}/>}
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