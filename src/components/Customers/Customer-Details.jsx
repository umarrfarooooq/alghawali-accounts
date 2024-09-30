"use client";

import React, { useState } from "react";
import Tabs from "@/components/Tabs/Tabs";
import { List, User } from "lucide-react";
import CustomerDetailsData from "@/components/Customers/Customer-Details-Data";
import CustomerTransactions from "@/components/Customers/Customer-Transactions";
import { useCustomerById } from "@/hooks/useCustomers";
import CustomLoading from "@/components/ui/CustomLoading";

const CustomerDetails = ({ id }) => {
  const [activeTab, setActiveTab] = useState("customerDetails");
  const { data: customer, isLoading, isError } = useCustomerById(id);

  const tabItems = [
    {
      key: "customerDetails",
      label: "Customer Details",
      icon: <User />,
    },
    {
      key: "customerTransactions",
      label: "Transactions",
      icon: <List />,
    },
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  if (isLoading) return <CustomLoading />;
  if (isError) return <div>Error fetching customer data</div>;
  if (!customer) return <div>No customer data found</div>;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Tabs
          tabs={tabItems}
          activeTab={activeTab}
          className="flex flex-col sm:flex-row"
          onTabClick={handleTabClick}
        />
      </div>
      {activeTab === "customerDetails" && (
        <CustomerDetailsData customer={customer} />
      )}
      {activeTab === "customerTransactions" && (
        <CustomerTransactions customerId={customer._id} />
      )}
    </div>
  );
};

export default CustomerDetails;
