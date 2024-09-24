import React, { useEffect, useState } from "react";
import MainCard from "@/components/Main-Card/Main-Card";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, IdCard, Shirt } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import AmountPeriod from "../Main-Card/amountPeriod";
import CustomLoading from "../ui/CustomLoading";

const fetchCardData = async (period) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    "api/v1/staffAccounts/all-accounts-summary-withFilters",
    {
      headers: {
        Authorization: `Bearer ${verifyToken}`,
      },
      params: { period },
    }
  );
  return data;
};

const MainCards = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cardData", selectedPeriod],
    queryFn: () => fetchCardData(selectedPeriod),
    staleTime: 300000,
    retry: 2,
  });

  useEffect(() => {
    refetch();
  }, [selectedPeriod]);

  if (isLoading)
    return (
      <div>
        <CustomLoading />
      </div>
    );
  if (isError) return <div>Error fetching data.</div>;

  const {
    totalReceived,
    totalSent,
    totalBalance,
    totalVisaChangeAmount,
    totalUniformAmount,
    totalTillNowReceived,
    totalTillNowSent,
    totalVisaChangeAmountTillNow,
    totalUniformAmountTillNow,
    totalPendingReceived,
    totalPendingSent,
    totalPendingReceivedTillNow,
    totalPendingSentTillNow,
  } = data;

  return (
    <div className="px-4 md:px-8">
      <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6">
        <div className="flex items-end justify-end">
          <AmountPeriod
            onPeriodChange={setSelectedPeriod}
            selectedPeriod={selectedPeriod}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <MainCard
            bg="bg-[#88ff7d1a]"
            svgBg="bg-[#88FF7D]"
            title="Available Balance"
            selectedPeriod={selectedPeriod}
            amount={totalBalance}
            totalTillNow={totalTillNowReceived - totalTillNowSent}
          />
          <MainCard
            bg="bg-[#c446ff0d]"
            svgBg="bg-[#C446FF]"
            svg={<ArrowDown color="#FFFBFA" />}
            title="Total Received"
            selectedPeriod={selectedPeriod}
            amount={totalReceived}
            totalTillNow={totalTillNowReceived}
          />
          <MainCard
            bg="bg-[#ff46460d]"
            svgBg="bg-[#FF4646]"
            svg={<ArrowUp color="#FFFBFA" />}
            title="Total Sent"
            selectedPeriod={selectedPeriod}
            amount={totalSent}
            totalTillNow={totalTillNowSent}
          />
          <MainCard
            bg="bg-[#e2ff4d1a]"
            svgBg="bg-[#E2FF4D]"
            svg={<IdCard />}
            title="Visa Change Amount"
            selectedPeriod={selectedPeriod}
            amount={totalVisaChangeAmount}
            totalTillNow={totalVisaChangeAmountTillNow}
          />
          <MainCard
            bg="bg-[#ff4d4d1a]"
            svgBg="bg-[#FF4D4D]"
            svg={<Shirt color="#FFFBFA" />}
            title="Uniform Amount"
            selectedPeriod={selectedPeriod}
            amount={totalUniformAmount}
            totalTillNow={totalUniformAmountTillNow}
          />
        </div>
      </div>
    </div>
  );
};

export default MainCards;
