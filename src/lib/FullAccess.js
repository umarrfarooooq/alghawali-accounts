import { VerifyStaffToken } from "./VerifyStaffToken";
import roles from "./roles";
const FullAccess = () => {
  const { roles: staffRoles } = VerifyStaffToken();
  const hasFullAccess = staffRoles.includes(roles.fullAccessOnAccounts);
  return hasFullAccess;
};

export default FullAccess;
