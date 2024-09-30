"use client";

import { useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";

const fetchCustomers = async (apiEndpoint, searchTerm = "") => {
  const { verifyToken } = VerifyStaffToken();
  const response = await axiosInstance.get(
    `${apiEndpoint}?searchTerm=${encodeURIComponent(searchTerm)}`,
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
    }
  );
  return response.data.customers;
};

export function CustomerSearch({
  className,
  onCustomerSelect,
  apiEndpoint = "api/v2/customers/active-customers",
  placeholder = "Search customer...",
  displaySelectedCustomer = true,
}) {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTimeoutRef = useRef(null);

  const {
    data: customers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["customers", searchTerm, apiEndpoint],
    queryFn: () => fetchCustomers(apiEndpoint, searchTerm),
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
    (customer) => {
      setSelectedCustomer(customer);
      onCustomerSelect(customer);
      setOpen(false);
    },
    [onCustomerSelect]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`w-full bg-[#E3E3E3] filter border border-[#C3D0D4] h-[4rem] outline-none rounded-lg px-4 py-2 text-left ${className}`}
        >
          {displaySelectedCustomer && selectedCustomer
            ? selectedCustomer.customerName
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
            <div className="p-2 text-red-500">Error fetching customers</div>
          )}
          {!isLoading &&
            !error &&
            Array.isArray(customers) &&
            customers.length === 0 && (
              <div className="p-2">No customer found.</div>
            )}
          {Array.isArray(customers) && customers.length > 0 && (
            <div className="p-1">
              {customers.map((customer) => (
                <div
                  key={customer._id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-default"
                  onClick={() => handleSelect(customer)}
                >
                  <div>
                    <div className="text-sm font-semibold text-[#262F32]">
                      {customer.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Phone: {customer.phoneNo}
                    </div>
                    <div className="text-sm text-gray-500">
                      Code: {customer.uniqueCode}
                    </div>
                  </div>
                  {selectedCustomer?._id === customer._id && (
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
