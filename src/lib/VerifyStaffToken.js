"use client";
import { jwtDecode } from "jwt-decode";

export const VerifyStaffToken = () => {
  if (typeof window === "undefined") {
    return { valid: false };
  }

  const staffToken = localStorage.getItem("accountToken");

  if (!staffToken) {
    return { valid: false };
  }

  try {
    const decoded = jwtDecode(staffToken);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      return { valid: false, roles: [] };
    }

    const staffRoles = decoded.staffRoles;
    const staffName = decoded.staffName;
    const staffId = decoded.staffId;
    const staffAccountId = decoded.staffAccountId;
    return {
      valid: true,
      roles: staffRoles,
      verifyToken: staffToken,
      staffName: staffName,
      staffId: staffId,
      staffAccountId: staffAccountId,
    };
  } catch (error) {
    return { valid: false, roles: [] };
  }
};
