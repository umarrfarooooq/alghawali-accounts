"use client";
import { History, Users, Wallet } from "lucide-react";
import React, { useState } from "react";
import Tabs from "@/components/Tabs/Tabs";
import OurAccounts from "@/components/Our-Account/Our-Accounts";
import PendingTransactions from "../Transactions/Pending-Transactions";
import RecentTransactions from "../Transactions/Recent-Transactions";
import CustomerTypes from "../Customers/Customer-Types";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState("ourAccounts");

  const tabItems = [
    {
      key: "ourAccounts",
      label: "Our Accounts",
      icon: <Wallet />,
    },
    {
      key: "pendingTransactions",
      label: "Pending Transactions",
      icon: <History />,
    },
    {
      key: "recentTransactions",
      label: "Recent Transactions",
      icon: <History />,
    },
    {
      key: "customers",
      label: "Customers",
      icon: <Users />,
    },
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="px-4 md:px-8 flex flex-col gap-6">
      <Tabs tabs={tabItems} activeTab={activeTab} onTabClick={handleTabClick} />
      <div>
        {activeTab === "ourAccounts" && <OurAccounts />}
        {activeTab === "pendingTransactions" && <PendingTransactions />}
        {activeTab === "recentTransactions" && <RecentTransactions />}
        {activeTab === "customers" && <CustomerTypes />}
      </div>
    </div>
  );
};

export default TabsSection;
