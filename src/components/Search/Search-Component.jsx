import { Search } from "lucide-react";
import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";

const SearchComponent = ({ onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="flex w-full md:w-[420px] lg:w-[520px] bg-[#EBEBEB] items-center rounded-lg border border-[#C3D0D4] py-4 px-2 gap-2">
      <Search color="#8C979C" />
      <input
        className="outline-none w-full searchInput bg-transparent"
        type="text"
        placeholder={placeholder || "Search"}
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchComponent;
