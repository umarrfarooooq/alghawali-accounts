"use client";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import Notifications from "@/components/Notifications/Notifications";
import AuthRedirect from "@/lib/AuthRedirect";
import React from "react";

const NotificationsPage = () => {
  return (
    <AuthRedirect requireAuth={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <NavigateBack currentPage="Notifications" />
          <Notifications />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default NotificationsPage;
