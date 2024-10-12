import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";

const fetchAllPendingTransactions = async (searchTerm = "") => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`/api/v1/transaction/pending`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { searchTerm },
  });
  return data;
};

const fetchAllRecentTransactions = async (searchTerm = "") => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`/api/v1/transaction/recent`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { searchTerm },
  });
  return data;
};

const fetchMyPendingTransactions = async (staffAccountId, searchTerm = "") => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`/api/v1/transaction/my/pending`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { staffAccountId, searchTerm },
  });
  return data;
};

const fetchMyRecentTransactions = async (staffAccountId, searchTerm = "") => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`/api/v1/transaction/my/recent`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { staffAccountId, searchTerm },
  });
  return data;
};

const fetchTransactionById = async (transactionId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `/api/v1/transaction/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

const fetchStaffTransactions = async (staffId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `/api/v1/transaction/staff/${staffId}`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

const fetchMyTransactions = async (staffAccountId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `/api/v1/transaction/my/transactions`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
      params: { staffAccountId },
    }
  );
  return data;
};

const fetchMyBalanceDetails = async ({ staffAccountId }) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`api/v1/transaction/my/summary`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { staffAccountId },
  });
  return data;
};

const fetchStaffBalanceDetails = async (staffId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v1/transaction/staff/${staffId}/summary`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

export const useAllPendingTransactions = ({ enabled, searchTerm = "" }) => {
  return useQuery({
    queryKey: ["allPendingTransactions", searchTerm],
    queryFn: () => fetchAllPendingTransactions(searchTerm),
    enabled,
  });
};

export const useAllRecentTransactions = ({ enabled, searchTerm = "" }) => {
  return useQuery({
    queryKey: ["allRecentTransactions", searchTerm],
    queryFn: () => fetchAllRecentTransactions(searchTerm),
    enabled,
  });
};

export const useMyPendingTransactions = (
  staffAccountId,
  { enabled, searchTerm = "" }
) => {
  return useQuery({
    queryKey: ["myPendingTransactions", staffAccountId, searchTerm],
    queryFn: () => fetchMyPendingTransactions(staffAccountId, searchTerm),
    enabled,
  });
};

export const useMyRecentTransactions = (
  staffAccountId,
  { enabled, searchTerm = "" }
) => {
  return useQuery({
    queryKey: ["myRecentTransactions", staffAccountId, searchTerm],
    queryFn: () => fetchMyRecentTransactions(staffAccountId, searchTerm),
    enabled,
  });
};

export const useTransactionById = (transactionId) => {
  return useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => fetchTransactionById(transactionId),
    enabled: !!transactionId,
  });
};

export const useStaffTransactions = (staffId) => {
  return useQuery({
    queryKey: ["staffTransactions", staffId],
    queryFn: () => fetchStaffTransactions(staffId),
    enabled: !!staffId,
  });
};

export const useMyTransactions = (staffAccountId) => {
  return useQuery({
    queryKey: ["myTransactions", staffAccountId],
    queryFn: () => fetchMyTransactions(staffAccountId),
    enabled: !!staffAccountId,
  });
};

export const useMyBalanceDetails = ({ staffAccountId }) => {
  return useQuery({
    queryKey: ["myBalanceDetails"],
    queryFn: () => fetchMyBalanceDetails({ staffAccountId }),
    enabled: !!staffAccountId,
  });
};

export const useStaffBalanceDetails = (staffId) => {
  return useQuery({
    queryKey: ["staffBalanceDetails", staffId],
    queryFn: () => fetchStaffBalanceDetails(staffId),
    enabled: !!staffId,
  });
};
