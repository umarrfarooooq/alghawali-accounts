import React from "react";
import BalanceCards from "@/components/Balance/Balance-Cards";
import AllAccounts from "./All-Accounts";

const OurAccounts = () => {
  return (
    <div className="flex flex-col gap-6">
      <BalanceCards />
      <AllAccounts />
    </div>
  );
};

export default OurAccounts;
