import React, { useState } from "react";
import Tabs from "../Tabs/Tabs";
import ToRecieveDues from "./To-Recieve-Dues";
import ToSentDues from "./To-Sent-Dues";

const PendingDues = () => {
  const [activeTab, setActiveTab] = useState("To Recieve");
  const tabItems = [
    {
      key: "To Recieve",
      label: "To Recieve",
    },
    {
      key: "To Sent",
      label: "To Sent",
    },
  ];
  const handleTabClick = (key) => {
    setActiveTab(key);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <Tabs
          tabs={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          className="md:w-max rounded-[62rem] flex flex-row"
          tabClasses="rounded-[62rem] items-center justify-center"
        />
      </div>
      {activeTab === "To Recieve" && <ToRecieveDues />}
      {activeTab === "To Sent" && <ToSentDues />}
    </div>
  );
};

export default PendingDues;
