import React from "react";
import {
  usePendingDuesToReceive,
  useMyPendingDuesToReceive,
} from "@/hooks/useCustomers";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import CustomLoading from "../ui/CustomLoading";
import CustomerTable from "./Customer-Table";

const ToRecieveDues = () => {
  const { roles: staffRoles, staffAccountId } = VerifyStaffToken();

  const accessCheck = staffRoles.includes(roles.fullAccessOnAccounts);

  const { data: allPendingDues, isLoading: loadingAllDues } =
    usePendingDuesToReceive({
      enabled: accessCheck,
    });

  const { data: myPendingDues, isLoading: loadingMyDues } =
    useMyPendingDuesToReceive(staffAccountId, {
      enabled: !accessCheck && !!staffAccountId,
    });

  if (loadingAllDues || loadingMyDues) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  const dues = accessCheck ? allPendingDues : myPendingDues;

  return (
    <div className="flex flex-col gap-6">
      {dues && dues.length > 0 ? (
        dues.map((customer) => (
          <CustomerTable key={customer._id} customer={customer} />
        ))
      ) : (
        <div>No pending dues to receive found.</div>
      )}
    </div>
  );
};

export default ToRecieveDues;
