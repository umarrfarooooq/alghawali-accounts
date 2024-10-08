"use client";

import { useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Avatar from "@public/vector.jpg";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchMaids = async (apiEndpoint, search = "") => {
  const { verifyToken } = VerifyStaffToken();
  const response = await axiosInstance.get(
    `${apiEndpoint}?search=${encodeURIComponent(search)}`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return response.data;
};

export function MaidSearch({
  className,
  onMaidSelect,
  apiEndpoint = "api/v1/maids/",
  placeholder = "Search maid...",
  displaySelectedMaid = true,
  additionalFields = [],
}) {
  const [open, setOpen] = useState(false);
  const [selectedMaid, setSelectedMaid] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTimeoutRef = useRef(null);

  const {
    data: maids,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["maids", searchTerm, apiEndpoint],
    queryFn: () => fetchMaids(apiEndpoint, searchTerm),
    enabled: open,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  const handleSearch = useCallback(
    (event) => {
      const newValue = event.target.value;
      setSearchTerm(newValue);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        refetch();
      }, 1000);
    },
    [refetch]
  );

  const handleSelect = useCallback(
    (maid) => {
      setSelectedMaid(maid);
      onMaidSelect(maid);
      setOpen(false);
    },
    [onMaidSelect]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`w-full bg-[#E3E3E3] filter border border-[#C3D0D4] h-[4rem] outline-none rounded-lg px-4 py-2 text-left ${className}`}
        >
          {displaySelectedMaid && selectedMaid
            ? selectedMaid.name
            : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="p-2">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border rounded outline-none"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            </div>
          )}
          {error && (
            <div className="p-2 text-red-500">Error fetching maids</div>
          )}
          {!isLoading &&
            !error &&
            Array.isArray(maids) &&
            maids.length === 0 && <div className="p-2">No maid found.</div>}
          {Array.isArray(maids) && maids.length > 0 && (
            <div className="p-1">
              {maids.map((maid) => (
                <div
                  key={maid._id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-default"
                  onClick={() => handleSelect(maid)}
                >
                  <Image
                    src={
                      maid.maidImg?.includes("uploads/")
                        ? `${API_URL}${maid.maidImg}`
                        : Avatar
                    }
                    alt={maid.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-2 w-12 h-12 object-cover object-top"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#262F32]">
                      {maid.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Code: {maid.code}
                    </div>
                    {additionalFields.map((field, index) => (
                      <div key={index} className="text-sm text-gray-500">
                        {field}: {maid[field]}
                      </div>
                    ))}
                  </div>
                  {selectedMaid?._id === maid._id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
