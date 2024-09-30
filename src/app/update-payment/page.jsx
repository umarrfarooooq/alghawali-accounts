"use client";

import UpdatePaymentForm from "@/components/Forms/Update-Payment-Form";
import NavigateBack from "@/components/Navigate-Back/NavigateBack";
import AuthRedirect from "@/lib/AuthRedirect";
import React from "react";

const UpdatePayment = () => {
  return (
    <div>
      <AuthRedirect requireAuth={true}>
        <div className="bg-[#F2F5FF] min-h-screen">
          <div className="px-4 md:px-8 pt-4 md:pt-8 flex flex-col gap-4">
            <NavigateBack currentPage="Update Payment" />
            <UpdatePaymentForm />
          </div>
        </div>
      </AuthRedirect>
    </div>
  );
};

export default UpdatePayment;
