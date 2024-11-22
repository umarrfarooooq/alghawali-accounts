"use client";
import React, { useState } from "react";
import { CheckCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Avatar from "@public/vector.jpg";
import Image from "next/image";
import {
  useUnreadNotifications,
  useAllNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
} from "@/hooks/useNotifications";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Label from "@/components/ui/Label";
import CustomButton from "../ui/CustomBtn";
import { useToast } from "@/hooks/use-toast";
import CustomLoading from "../ui/CustomLoading";

const Notifications = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 25;

  const { data: unreadNotifications, isLoading: unreadLoading } =
    useUnreadNotifications();
  const { data: allNotificationsData, isLoading: allLoading } =
    useAllNotifications({
      page,
      limit,
      isRead: filter === "all" ? undefined : filter === "read",
    });

  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead } = useMarkAllAsRead();

  const handleMarkAsRead = (notificationId) => {
    markAsRead(notificationId, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Notification marked as read",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to mark notification as read",
          variant: "destructive",
        });
      },
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead(undefined, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "All notifications marked as read",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to mark all notifications as read",
          variant: "destructive",
        });
      },
    });
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="bg-[#FFFBFA] border border-[#EBEBEB] w-full lg:max-w-[38rem] lg:min-w-[38rem] mx-auto p-3 sm:p-8 rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="text-xl font-semibold flex items-center gap-2">
          Notifications
        </div>
        {unreadNotifications?.length > 0 && (
          <div
            onClick={handleMarkAllAsRead}
            className="text-sm font-semibold text-[#107243] cursor-pointer"
          >
            Mark all as read
          </div>
        )}
      </div>

      <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8">
        <div className="mb-6">
          <RadioGroup
            defaultValue="all"
            onValueChange={setFilter}
            className="grid grid-cols-3 gap-3 p-4 rounded-lg border border-[#C3D0D4] bg-[#FFFBFA]"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="all"
                id="all"
                className="border-[#031D92] border-2 text-[#031D92]"
              />
              <Label htmlFor="all" label="All" className="font-bold" />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="unread"
                id="unread"
                className="border-[#031D92] border-2 text-[#031D92]"
              />
              <Label htmlFor="unread" label="Unread" className="font-bold" />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="read"
                id="read"
                className="border-[#031D92] border-2 text-[#031D92]"
              />
              <Label htmlFor="read" label="Read" className="font-bold" />
            </div>
          </RadioGroup>
        </div>

        {allLoading || unreadLoading ? (
          <div className="text-center py-8">
            <CustomLoading />
          </div>
        ) : allNotificationsData?.notifications?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notifications found
          </div>
        ) : (
          <div className="space-y-4">
            {allNotificationsData?.notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 rounded-lg border ${
                  notification.isRead ? "bg-white" : "bg-blue-50"
                } hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-2xl">
                    <Image
                      src={
                        notification?.maid?.maidImg?.includes("uploads/")
                          ? `${API_URL}${notification?.maid?.maidImg}`
                          : Avatar
                      }
                      alt={notification?.maid?.name}
                      width={40}
                      height={40}
                      className="rounded-full mr-2 w-12 h-12 object-cover object-top"
                    />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                      {notification.maid && (
                        <span>• Maid: {notification.maid?.name}</span>
                      )}
                    </div>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <CheckCheck size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {allNotificationsData?.pagination?.totalPages > 1 && (
          <div className="flex justify-between items-center gap-2 mt-6 w-full">
            <CustomButton
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              icon={<ChevronLeft size={20} />}
              disableLoadingOnClick={true}
              bg="bg-[#107243]"
              color="text-[#FFFBFA]"
              className="w-max"
            />
            <span>
              Page {page} of {allNotificationsData?.pagination?.totalPages}
            </span>
            <CustomButton
              onClick={() =>
                setPage((prev) =>
                  Math.min(
                    allNotificationsData?.pagination?.totalPages,
                    prev + 1
                  )
                )
              }
              disabled={page === allNotificationsData?.pagination?.totalPages}
              icon={<ChevronRight size={20} />}
              bg="bg-[#107243]"
              disableLoadingOnClick={true}
              className="w-max"
              color="text-[#FFFBFA]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
