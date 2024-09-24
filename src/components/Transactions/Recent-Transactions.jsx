import React from "react";
import TransactionList from "./Transaction-List";

import {
  useMyRecentTransactions,
  useAllRecentTransactions,
} from "@/hooks/useTransactions";

import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import CustomLoading from "../ui/CustomLoading";

const RecentTransactions = () => {
  const { roles: staffRoles, staffAccountId } = VerifyStaffToken();
  
  const accessCheck = staffRoles.includes(roles.fullAccessOnAccounts);

  const { data: allRecentTransactions, isLoading: loadingAllRecent } =
    useAllRecentTransactions({
      enabled: accessCheck,
    });

  const { data: myRecentTransactions, isLoading: loadingMyRecent } =
    useMyRecentTransactions(staffAccountId, {
      enabled: !accessCheck && !!staffAccountId,
    });

  if (loadingAllRecent || loadingMyRecent) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  const transactions = accessCheck
    ? allRecentTransactions
    : myRecentTransactions;

  return (
    <>
      <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
        <div className="text-2xl font-bold">Recent Transactions</div>
        <div className="flex flex-col gap-6">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionList key={transaction._id} transaction={transaction} />
            ))
          ) : (
            <div>No recent transactions found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentTransactions;
