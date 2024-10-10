import React, { useState } from "react";
import Tabs from "../Tabs/Tabs";
import AllCustomers from "./All-Customers";
import SearchComponent from "../Search/Search-Component";
import PaymentCleared from "./Payment-Cleared";
import PendingDues from "./Pending-Dues";

const CustomerTypes = () => {
  const [activeTab, setActiveTab] = useState("All Costumers");
  const [searchTerm, setSearchTerm] = useState("");

  const tabItems = [
    {
      key: "All Costumers",
      label: "All Costumers",
    },
    {
      key: "Costumers Pending Dues",
      label: "Costumers Pending Dues",
    },
    {
      key: "Payment Cleared",
      label: "Payment Cleared",
    },
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
        <Tabs
          tabs={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />

        {activeTab === "All Costumers" && (
          <>
            <div className="flex md:items-center md:justify-between flex-col md:flex-row gap-4">
              <div className="text-[#262F32] font-bold text-2xl">
                All Customers <span className="font-normal">122</span>
              </div>
              <SearchComponent onSearch={handleSearch} />
            </div>
            <AllCustomers searchTerm={searchTerm} />
          </>
        )}
        {activeTab === "Costumers Pending Dues" && <PendingDues />}
        {activeTab === "Payment Cleared" && <PaymentCleared />}
      </div>
    </>
  );
};

export default CustomerTypes;
