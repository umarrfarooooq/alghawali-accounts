import React from "react";
import TransactionList from "../Transactions/Transaction-List";
import { useCustomerTransactions } from "@/hooks/useCustomers";
import CustomLoading from "../ui/CustomLoading";

const CustomerTransactions = ({ customerId }) => {
  const { data, isLoading, isError } = useCustomerTransactions(customerId);
  if (isLoading) {
    return <CustomLoading />;
  }

  if (isError) {
    return <div>Error loading transactions</div>;
  }
  return (
    <>
      {data?.transactions.length > 0 ? (
        <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
          {data?.transactions.map((transaction) => (
            <TransactionList key={transaction._id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div>No transactions found</div>
      )}
    </>
  );hgf
};

export default CustomerTransactions;
