"use client";
import ReplaceForm from "@/components/Forms/Replace";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import AuthRedirect from "@/lib/AuthRedirect";
import React from "react";

const Replace = () => {
  return (
    <AuthRedirect requireAuth={true}>
      <div className="bg-[#F2F5FF] min-h-screen">
        <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
          <NavigateBack currentPage="Replace Maid" />
          <ReplaceForm />
        </div>
      </div>
    </AuthRedirect>
  );
};

export default Replace;
