"use client";
import React from "react";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import AuthRedirect from "@/lib/AuthRedirect";
import CreateStaffAccountForm from "@/components/Forms/Add-New-Account";

const AddAccountPage = () => {
  return (
    <AuthRedirect requireAuth={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <NavigateBack currentPage="Add New Account" />
          <CreateStaffAccountForm />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default AddAccountPage;
