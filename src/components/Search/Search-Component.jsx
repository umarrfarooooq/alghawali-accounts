import { Search } from "lucide-react";
import React from "react";

const SearchComponent = ({ onSearch }) => {
  return (
    <div className="flex w-full md:w-[420px] lg:w-[520px] bg-[#EBEBEB] items-center rounded-lg border border-[#C3D0D4] py-4 px-2 gap-2">
      <Search color="#8C979C" />
      <input
        className="outline-none w-full searchInput bg-transparent"
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
