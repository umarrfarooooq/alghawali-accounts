import React from "react";
import { useMyTransactions } from "@/hooks/useTransactions";
import CustomLoading from "../ui/CustomLoading";
import TransactionList from "./Transaction-List";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
const MyTransactions = () => {
  const { staffAccountId } = VerifyStaffToken();
  const { data, isLoading, error } = useMyTransactions(staffAccountId);

  if (isLoading) return <CustomLoading />;
  if (error) {
    return <div>Error: {error?.response?.data?.message}</div>;
  }
  if (!data || data.transactions.length === 0)
    return <div>No transactions found.</div>;

  const { transactions } = data;

  return (
    <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
      <div className="text-2xl font-bold">Transactions</div>
      <div className="flex flex-col gap-6">
        {transactions.map((transaction) => (
          <TransactionList key={transaction._id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default MyTransactions;
