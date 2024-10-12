"use client";
import { History, Users, Wallet } from "lucide-react";
import React, { useState } from "react";
import Tabs from "@/components/Tabs/Tabs";
import OurAccounts from "@/components/Our-Account/Our-Accounts";
import PendingTransactions from "../Transactions/Pending-Transactions";
import RecentTransactions from "../Transactions/Recent-Transactions";
import CustomerTypes from "../Customers/Customer-Types";
import SearchComponent from "../Search/Search-Component";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState("ourAccounts");
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="px-4 md:px-8 flex flex-col gap-6">
      <Tabs tabs={tabItems} activeTab={activeTab} onTabClick={handleTabClick} />
      <div>
        {activeTab === "ourAccounts" && <OurAccounts />}
        {activeTab === "pendingTransactions" && (
          <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between">
              <div className="text-2xl font-bold">Pending Transactions</div>
              <SearchComponent
                placeholder="Search by Invoice Number"
                onSearch={handleSearch}
              />
            </div>
            <PendingTransactions searchTerm={searchTerm} />
          </div>
        )}
        {activeTab === "recentTransactions" && (
          <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between">
              <div className="text-2xl font-bold">Recent Transactions</div>
              <SearchComponent
                placeholder="Search by Invoice Number"
                onSearch={handleSearch}
              />
            </div>
            <RecentTransactions searchTerm={searchTerm} />
          </div>
        )}
        {activeTab === "customers" && <CustomerTypes />}
      </div>
    </div>
  );
};

export default TabsSection;
