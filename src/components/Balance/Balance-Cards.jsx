import React, { useState } from "react";
import BalanceCard from "@/components/Balance/Balance-Card";
import { useStaffAccount } from "@/hooks/useStaffAccount";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import { ArrowDown, ArrowUp, Wallet, BarChart } from "lucide-react";
import CustomLoading from "../ui/CustomLoading";
import CustomButton from "../ui/CustomBtn";
import TransferAmount from "../Forms/Transfer-Amount";
import FullAccess from "@/lib/FullAccess";
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

  const totalReceivedAmount =
    (staffAccount?.totalReceivedAmount || 0) +
    (staffAccount?.pendingReceivedAmount || 0);
  const totalSentAmount =
    (staffAccount?.totalSentAmount || 0) +
    (staffAccount?.pendingSentAmount || 0);
  const availableBalance = totalReceivedAmount - totalSentAmount;

  return (
    <div className="rounded-xl flex flex-col gap-4 border border-[#031d921a] bg-[#FFFBFA] p-4 md:p-6">
      <div className="flex flex-col gap-4 tab:flex-row tab:items-center justify-between">
        <div className="text-lg md:text-2xl font-bold">My Account</div>
        <div className="flex flex-col md:flex-row gap-2">
          <CustomButton
            link="/transaction/my"
            txt="View Transactions"
            className="w-full md:w-max"
            color="text-[#107243]"
            border="border border-[#107243]"
          />
          <CustomButton
            link="/transaction/my-summary"
            txt="View Balance Details"
            className="w-full md:w-max"
            color="text-[#107243]"
            border="border border-[#107243]"
          />
          <div className="flex gap-2 flex-col sm:flex-row">
            <TransferAmount />
            {FullAccess() && (
              <CustomButton
                link="staff-sales-analytics"
                txt="Sales Analytics"
                icon={<BarChart size={20} />}
                bg="bg-[#107243]"
                color="text-[#FFFBFA]"
              />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-4">
        <BalanceCard
          amount={availableBalance}
          title="Available Balance"
          svg={<Wallet />}
        />
        <BalanceCard
          bg="bg-[#88ff7d1a]"
          svg={<ArrowDown />}
          svgBg="bg-[#88FF7D]"
          amount={totalReceivedAmount}
          title="In"
        />
        <BalanceCard
          bg="bg-[#ff46460d]"
          svg={<ArrowUp color="#FFFBFA" />}
          svgBg="bg-[#FF4646]"
          amount={totalSentAmount}
          title="Out"
        />
      </div>
    </div>
  );
};

export default BalanceCards;
