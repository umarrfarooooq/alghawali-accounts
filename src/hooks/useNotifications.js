import axiosInstance from "@/utils/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";

const fetchUnreadNotifications = async () => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get("api/v1/notifications/unread", {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
  });
  return data;
};

const fetchAllNotifications = async ({
  page = 1,
  limit = 1,
  type,
  isRead,
}) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get("api/v1/notifications", {
    headers: {
      Authorization: `Bearer ${verifyToken}`,
    },
    params: {
      page,
      limit,
      type,
      isRead,
    },
  });
  return data;
};

const markNotificationAsRead = async (notificationId) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.patch(
    `api/v1/notifications/${notificationId}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

const markAllNotificationsAsRead = async () => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.patch(
    "api/v1/notifications/mark-all-read",
    {},
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return data;
};

export const useUnreadNotifications = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: fetchUnreadNotifications,
    enabled,
    refetchInterval: 30000,
  });
};

export const useAllNotifications = (
  { page, limit, type, isRead },
  { enabled = true } = {}
) => {
  return useQuery({
    queryKey: ["allNotifications", page, limit, type, isRead],
    queryFn: () => fetchAllNotifications({ page, limit, type, isRead }),
    enabled,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["allNotifications"] });
    },
  });
};
