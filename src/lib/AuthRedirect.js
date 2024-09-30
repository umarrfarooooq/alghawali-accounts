import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import CustomLoading from "@/components/ui/CustomLoading";
import roles from "./roles";
const AuthRedirect = ({ children, requireAuth, redirectTo, fullAccess }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { valid, roles: staffRoles } = await VerifyStaffToken();
      setIsAuthenticated(valid);

      if (requireAuth && !valid) {
        router.push("/login");
      } else if (!requireAuth && valid) {
        router.push(redirectTo || "/");
      }

      if (fullAccess && !staffRoles.includes(roles.fullAccessOnAccounts)) {
        router.push("/");
      }
    };

    checkAuth();
  }, [router, requireAuth, redirectTo]);

  if (isAuthenticated === null) {
    return (
      <div>
        <CustomLoading fullScreen={true} />
      </div>
    );
  }

  return requireAuth === isAuthenticated ? children : null;
};

export default AuthRedirect;
