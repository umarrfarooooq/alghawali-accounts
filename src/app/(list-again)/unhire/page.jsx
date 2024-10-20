"use client";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import AuthRedirect from "@/lib/AuthRedirect";
import React from "react";
import UnHireForm from "@/components/Forms/UnHire";
const UnhirePage = () => {
  return (
    <AuthRedirect requireAuth={true} fullAccess={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <NavigateBack currentPage="Un Hire Maid" />
          <UnHireForm />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default UnhirePage;
