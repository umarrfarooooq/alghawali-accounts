import React from "react";
import StaffAccount from "./Staff-Account";
import { useAllStaffAccounts } from "@/hooks/useStaffAccount";
import CustomLoading from "../ui/CustomLoading";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
const AllAccounts = () => {
  const { roles: staffRoles } = VerifyStaffToken();
  const fullAccess = staffRoles.includes(roles.fullAccessOnAccounts);
  const {
    data: allStaffAccounts,
    isLoading,
    isError,
  } = useAllStaffAccounts(fullAccess);
  if (!fullAccess) return <></>;
  if (isLoading) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading accounts.</div>;
  }

  return (
    <div>
      <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
        <div className="text-lg md:text-2xl font-bold">Our All Accounts</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allStaffAccounts &&
            allStaffAccounts.map((account) => (
              <StaffAccount
                key={account.staffId}
                name={account.staffName}
                amount={account.balance}
                id={account._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllAccounts;
