import React from "react";
import CustomerTable from "./Customer-Table";
import {
  useClearedPaymentsCustomers,
  useMyClearedPayments,
} from "@/hooks/useCustomers";

import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import CustomLoading from "../ui/CustomLoading";

const PaymentCleared = () => {
  const { roles: staffRoles, staffAccountId } = VerifyStaffToken();

  const accessCheck = staffRoles.includes(roles.fullAccessOnAccounts);

  const { data: allClearedPaymentsCustomers, isLoading: loadingAllCleared } =
    useClearedPaymentsCustomers("", {
      enabled: accessCheck,
    });

  const { data: myClearedPayments, isLoading: loadingMyCleared } =
    useMyClearedPayments("", staffAccountId, {
      enabled: !accessCheck && !!staffAccountId,
    });

  if (loadingAllCleared || loadingMyCleared) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  const customers = accessCheck
    ? allClearedPaymentsCustomers
    : myClearedPayments;

  return (
    <div className="flex flex-col gap-6">
      {customers && customers.length > 0 ? (
        customers.map((customer) => (
          <CustomerTable key={customer._id} customer={customer} />
        ))
      ) : (
        <div>No cleared payments found.</div>
      )}
    </div>
  );
};

export default PaymentCleared;
