import React, { useState } from "react";
import BalanceCard from "@/components/Balance/Balance-Card";
import { useStaffAccount } from "@/hooks/useStaffAccount";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import CustomLoading from "../ui/CustomLoading";
import CustomButton from "../ui/CustomBtn";

const BalanceCards = () => {
  const { staffId } = VerifyStaffToken();
  const [period, setPeriod] = useState("Monthly");
  const {
    data: staffAccount,
    isLoading,
    error,
  } = useStaffAccount(staffId, period);

  if (isLoading)
    return (
      <div>
        <CustomLoading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="rounded-xl flex flex-col gap-4 border border-[#031d921a] bg-[#FFFBFA] p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-4">
        <CustomButton
          link="/transaction/my"
          txt="View Transactions"
          color="text-[#107243]"
          border="border border-[#107243]"
        />
        <CustomButton
          link="/transaction/my-summary"
          txt="View Balance Details"
          color="text-[#107243]"
          border="border border-[#107243]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-4">
        <BalanceCard
          amount={staffAccount.balance}
          title="Available Balance"
          svg={<Wallet />}
        />
        <BalanceCard
          bg="bg-[#88ff7d1a]"
          svg={<ArrowDown />}
          svgBg="bg-[#88FF7D]"
          amount={staffAccount.totalReceivedAmount}
          title="In"
        />
        <BalanceCard
          bg="bg-[#ff46460d]"
          svg={<ArrowUp color="#FFFBFA" />}
          svgBg="bg-[#FF4646]"
          amount={staffAccount.totalSentAmount}
          title="Out"
        />
      </div>
    </div>
  );
};

export default BalanceCards;
