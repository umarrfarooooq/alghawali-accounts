import React from "react";
import CustomerTable from "./Customer-Table";
import {
  useAllCustomerAccounts,
  useMyCustomerAccounts,
} from "@/hooks/useCustomers";

import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import CustomLoading from "../ui/CustomLoading";

const AllCustomers = () => {
  const { roles: staffRoles, staffAccountId } = VerifyStaffToken();

  const accessCheck = staffRoles.includes(roles.fullAccessOnAccounts);

  const { data: allCustomerAccounts, isLoading: loadingAllCustomers } =
    useAllCustomerAccounts("", {
      enabled: accessCheck,
    });

  const { data: myCustomerAccounts, isLoading: loadingMyCustomers } =
    useMyCustomerAccounts("", staffAccountId, {
      enabled: !accessCheck && !!staffAccountId,
    });

  if (loadingAllCustomers || loadingMyCustomers) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  const customers = accessCheck ? allCustomerAccounts : myCustomerAccounts;

  return (
    <div className="flex flex-col gap-6">
      {customers && customers.length > 0 ? (
        customers.map((customer) => (
          <CustomerTable key={customer._id} customer={customer} />
        ))
      ) : (
        <div>No customer accounts found.</div>
      )}
    </div>
  );
};

export default AllCustomers;
