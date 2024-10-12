import React from "react";
import TransactionList from "./Transaction-List";
import {
  useAllPendingTransactions,
  useMyPendingTransactions,
} from "@/hooks/useTransactions";

import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import CustomLoading from "../ui/CustomLoading";

const PendingTransactions = ({ searchTerm }) => {
  const { roles: staffRoles, staffAccountId } = VerifyStaffToken();

  const accessCheck = staffRoles.includes(roles.fullAccessOnAccounts);

  const { data: allPendingTransactions, isLoading: loadingAllPending } =
    useAllPendingTransactions({
      enabled: accessCheck,
      searchTerm,
    });

  const { data: myPendingTransactions, isLoading: loadingMyPending } =
    useMyPendingTransactions(staffAccountId, {
      enabled: !accessCheck && !!staffAccountId,
      searchTerm,
    });

  if (loadingAllPending || loadingMyPending) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  const transactions = accessCheck
    ? allPendingTransactions
    : myPendingTransactions;

  return (
    <>
      <div className="flex flex-col gap-6">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionList key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <div>No pending transactions found.</div>
        )}
      </div>
    </>
  );
};

export default PendingTransactions;
