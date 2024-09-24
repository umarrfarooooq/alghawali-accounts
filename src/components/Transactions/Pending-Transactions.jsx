import React from "react";
import TransactionList from "./Transaction-List";
import {
  useAllPendingTransactions,
  useMyPendingTransactions,
} from "@/hooks/useTransactions";

import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import CustomLoading from "../ui/CustomLoading";

const PendingTransactions = () => {
  const { roles: staffRoles, staffAccountId } = VerifyStaffToken();

  const accessCheck = staffRoles.includes(roles.fullAccessOnAccounts);

  const { data: allPendingTransactions, isLoading: loadingAllPending } =
    useAllPendingTransactions({
      enabled: accessCheck,
    });

  const { data: myPendingTransactions, isLoading: loadingMyPending } =
    useMyPendingTransactions(staffAccountId, {
      enabled: !accessCheck && !!staffAccountId,
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
      <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
        <div className="text-2xl font-bold">Pending Transactions</div>
        <div className="flex flex-col gap-6">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionList
                key={transaction._id}
                transaction={transaction}
              />
            ))
          ) : (
            <div>No pending transactions found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PendingTransactions;
