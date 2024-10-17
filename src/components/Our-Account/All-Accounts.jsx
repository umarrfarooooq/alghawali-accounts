import React from "react";
import StaffAccount from "./Staff-Account";
import { useAllStaffAccounts } from "@/hooks/useStaffAccount";
import CustomLoading from "../ui/CustomLoading";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import roles from "@/lib/roles";
import { PlusIcon } from "lucide-react";
import CustomButton from "../ui/CustomBtn";
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
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="text-lg md:text-2xl font-bold">Our All Accounts</div>
          <div className="flex justify-end">
            <CustomButton
              link="/add-account"
              icon={<PlusIcon size={16} />}
              className="w-full md:w-max"
              txt="Add New Account"
              color="text-[#107243]"
              border="border border-[#107243]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allStaffAccounts &&
            allStaffAccounts.map((account) => (
              <StaffAccount
                key={account.staffId || account._id}
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
