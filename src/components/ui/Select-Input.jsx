import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectInput = ({
  selectValue,
  options = [],
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={`w-full bg-[#E3E3E3] border border-[#C3D0D4] h-[4rem] outline-none rounded-lg px-4 py-2 text-left ${className}`}
      >
        <SelectValue placeholder={selectValue || placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
