import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";

const fetchStaffAccount = async (staffId, period) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v1/staffAccounts/my-account-withFilters/${staffId}`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
      params: { period },
    }
  );
  return data;
};

const fetchAllStaffAccounts = async () => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `/api/v1/staffAccounts/all-accounts`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

export const useStaffAccount = (staffId, period) => {
  return useQuery({
    queryKey: ["staffAccount", staffId, period],
    queryFn: () => fetchStaffAccount(staffId, period),
    enabled: !!staffId,
  });
};

export const useAllStaffAccounts = (enabled) => {
  return useQuery({
    queryKey: ["allStaffAccounts"],
    queryFn: fetchAllStaffAccounts,
    enabled: enabled,
  });
};
