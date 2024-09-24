import React from "react";

const Tabs = ({ tabs, activeTab, onTabClick, className, tabClasses }) => {
  return (
    <div
      className={`bg-[#E3E3E3] overflow-auto border border-[#031d921a] rounded-xl md:px-6 px-4 py-2 w-full gap-2 md:flex md:items-center md:justify-between ${className}`}
    >
      {tabs.map((tab) => (
        <div
          key={tab.key}
          onClick={() => onTabClick(tab.key)}
          className={`${
            activeTab === tab.key ? "bg-[#FFFBFA] shadow-md" : ""
          } transition-all rounded-lg gap-2 md:px-4 px-2 py-4 w-full min-w-max flex items-start md:items-center justify-start md:justify-center cursor-pointer ${tabClasses}`}
        >
          <span>{tab.icon}</span>
          <span className="text-sm md:text-base">{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
