import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";

const fetchAllPendingTransactions = async () => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`/api/v1/transaction/pending`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
  });
  return data;
};

const fetchAllRecentTransactions = async () => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`/api/v1/transaction/recent`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
  });
  return data;
};

const fetchMyPendingTransactions = async (staffAccountId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`/api/v1/transaction/my/pending`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { staffAccountId },
  });
  return data;
};

const fetchMyRecentTransactions = async (staffAccountId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`/api/v1/transaction/my/recent`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { staffAccountId },
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

export const useAllPendingTransactions = ({ enabled }) => {
  return useQuery({
    queryKey: ["allPendingTransactions"],
    queryFn: fetchAllPendingTransactions,
    enabled,
  });
};

export const useAllRecentTransactions = ({ enabled }) => {
  return useQuery({
    queryKey: ["allRecentTransactions"],
    queryFn: fetchAllRecentTransactions,
    enabled,
  });
};

export const useMyPendingTransactions = (staffAccountId, { enabled }) => {
  return useQuery({
    queryKey: ["myPendingTransactions", staffAccountId],
    queryFn: () => fetchMyPendingTransactions(staffAccountId),
    enabled,
  });
};

export const useMyRecentTransactions = (staffAccountId, { enabled }) => {
  return useQuery({
    queryKey: ["myRecentTransactions", staffAccountId],
    queryFn: () => fetchMyRecentTransactions(staffAccountId),
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
