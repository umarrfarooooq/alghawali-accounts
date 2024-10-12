import React from "react";
import TransactionList from "./Transaction-List";

import {
  useMyRecentTransactions,
  useAllRecentTransactions,
} from "@/hooks/useTransactions";

import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import CustomLoading from "../ui/CustomLoading";
const RecentTransactions = ({ searchTerm }) => {
  const { roles: staffRoles, staffAccountId } = VerifyStaffToken();
  const accessCheck = staffRoles.includes(roles.fullAccessOnAccounts);

  const { data: allRecentTransactions, isLoading: loadingAllRecent } =
    useAllRecentTransactions({
      enabled: accessCheck,
      searchTerm,
    });

  const { data: myRecentTransactions, isLoading: loadingMyRecent } =
    useMyRecentTransactions(staffAccountId, {
      enabled: !accessCheck && !!staffAccountId,
      searchTerm,
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
      <div className="flex flex-col gap-6">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionList key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <div>No recent transactions found.</div>
        )}
      </div>
    </>
  );
};

export default RecentTransactions;
