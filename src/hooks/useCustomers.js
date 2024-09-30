import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
const fetchAllCustomerAccounts = async (searchTerm) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`api/v2/customers/all`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { searchTerm },
  });
  return data;
};

const fetchMyCustomerAccounts = async (searchTerm, customerId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`api/v2/customers/my/all`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: { searchTerm, customerId },
  });
  return data;
};

const fetchCustomerById = async (customerId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v2/customers/customer-account-by-id/${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

const fetchCustomerTransactions = async (
  customerId,
  sortBy = "date",
  sortOrder = "desc"
) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v1/transaction/customer/${customerId}`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
      params: { sortBy, sortOrder },
    }
  );
  return data;
};

const fetchPendingDuesToReceive = async () => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v2/customers/pending-to-recieve-dues`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

const fetchMyPendingDuesToReceive = async (customerId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v2/customers/my/pending-to-recieve-dues`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
      params: { customerId },
    }
  );
  return data;
};

const fetchPendingDuesToSend = async () => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v2/customers/pending-to-sent-dues`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

const fetchMyPendingDuesToSend = async (customerId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v2/customers/my/pending-to-sent-dues`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
      params: { customerId },
    }
  );
  return data;
};

const fetchClearedPaymentsCustomers = async () => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(`api/v2/customers/cleared-payment`, {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
  });
  return data;
};

const fetchMyClearedPayments = async (customerId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    `api/v2/customers/my/cleared-payment`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
      params: { customerId },
    }
  );
  return data;
};

export const useAllCustomerAccounts = (searchTerm, { enabled }) => {
  return useQuery({
    queryKey: ["allCustomerAccounts", searchTerm],
    queryFn: () => fetchAllCustomerAccounts(searchTerm),
    enabled,
  });
};

export const useMyCustomerAccounts = (searchTerm, customerId, { enabled }) => {
  return useQuery({
    queryKey: ["myCustomerAccounts", customerId, searchTerm],
    queryFn: () => fetchMyCustomerAccounts(searchTerm, customerId),
    enabled,
  });
};

export const useCustomerTransactions = (customerId, sortBy, sortOrder) => {
  return useQuery({
    queryKey: ["customerTransactions", customerId, sortBy, sortOrder],
    queryFn: () => fetchCustomerTransactions(customerId, sortBy, sortOrder),
    enabled: !!customerId,
  });
};

export const useCustomerById = (customerId) => {
  return useQuery({
    queryKey: ["customerById", customerId],
    queryFn: () => fetchCustomerById(customerId),
    enabled: !!customerId,
  });
};

export const usePendingDuesToReceive = ({ enabled }) => {
  return useQuery({
    queryKey: ["pendingDuesToReceive"],
    queryFn: fetchPendingDuesToReceive,
    enabled,
  });
};

export const useMyPendingDuesToReceive = (customerId, { enabled }) => {
  return useQuery({
    queryKey: ["myPendingDuesToReceive", customerId],
    queryFn: () => fetchMyPendingDuesToReceive(customerId),
    enabled,
  });
};

export const usePendingDuesToSend = ({ enabled }) => {
  return useQuery({
    queryKey: ["pendingDuesToSend"],
    queryFn: fetchPendingDuesToSend,
    enabled,
  });
};

export const useMyPendingDuesToSend = (customerId, { enabled }) => {
  return useQuery({
    queryKey: ["myPendingDuesToSend", customerId],
    queryFn: () => fetchMyPendingDuesToSend(customerId),
    enabled,
  });
};

export const useClearedPaymentsCustomers = ({ enabled }) => {
  return useQuery({
    queryKey: ["clearedPaymentsCustomers"],
    queryFn: fetchClearedPaymentsCustomers,
    enabled,
  });
};

export const useMyClearedPayments = (customerId, { enabled }) => {
  return useQuery({
    queryKey: ["myClearedPayments", customerId],
    queryFn: () => fetchMyClearedPayments(customerId),
    enabled,
  });
};
