import React, { useState } from "react";
import MainCard from "@/components/Main-Card/Main-Card";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import AmountPeriod from "../Main-Card/amountPeriod";
import CustomLoading from "../ui/CustomLoading";
import roles from "@/lib/roles";

const fetchCardData = async (periodData) => {
  const { verifyToken } = VerifyStaffToken();
  try {
    const params =
      periodData.type === "dateRange"
        ? {
            startDate: periodData.startDate,
            endDate: periodData.endDate,
          }
        : { period: periodData.period };

    const { data } = await axiosInstance.get(
      "api/v1/staffAccounts/all-transactions",
      {
        headers: {
          Authorization: `Bearer ${verifyToken}`,
        },
        params: params,
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const MainCards = () => {
  const { roles: staffRoles } = VerifyStaffToken();
  const fullAccess = staffRoles.includes(roles.fullAccessOnAccounts);
  const [periodData, setPeriodData] = useState({
    type: "period",
    period: "Monthly",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cardData", periodData],
    queryFn: () => fetchCardData(periodData),
    enabled: fullAccess && periodData.type !== "custom",
    staleTime: 300000,
    retry: 2,
  });

  const handlePeriodChange = (newPeriodData) => {
    setPeriodData(newPeriodData);
  };

  if (!fullAccess) return null;

  if (isLoading) return <CustomLoading />;
  if (isError) return <div>Error fetching data.</div>;

  const {
    totalReceived,
    totalSent,
    totalBalance,
    totalTillNowReceived,
    totalTillNowSent,
    totalPendingReceived,
    totalPendingSent,
    totalPendingReceivedTillNow,
    totalPendingSentTillNow,
  } = data || {};

  return (
    <div className="px-4 md:px-8">
      <div className="rounded-xl bg-[#FFFBFA] border border-[#031d921a] p-4 md:p-6">
        <div className="flex items-end justify-end mb-4">
          <AmountPeriod
            onPeriodChange={handlePeriodChange}
            selectedPeriod={
              periodData.type === "period" ? periodData.period : "custom"
            }
            startDate={data?.startDate}
            endDate={data?.endDate}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <MainCard
            bg="bg-[#88ff7d1a]"
            svgBg="bg-[#88FF7D]"
            title="Available Balance"
            selectedPeriod={
              periodData.type === "period" ? periodData.period : "custom"
            }
            amount={totalBalance}
            totalTillNow={totalTillNowReceived - totalTillNowSent}
          />
          <MainCard
            bg="bg-[#c446ff0d]"
            svgBg="bg-[#C446FF]"
            svg={<ArrowDown color="#FFFBFA" />}
            title="Total Received"
            selectedPeriod={
              periodData.type === "period" ? periodData.period : "custom"
            }
            amount={totalReceived}
            totalTillNow={totalTillNowReceived}
          />
          <MainCard
            bg="bg-[#ff46460d]"
            svgBg="bg-[#FF4646]"
            svg={<ArrowUp color="#FFFBFA" />}
            title="Total Sent"
            selectedPeriod={
              periodData.type === "period" ? periodData.period : "custom"
            }
            amount={totalSent}
            totalTillNow={totalTillNowSent}
          />
          <MainCard
            bg="bg-[#ffa64d1a]"
            svgBg="bg-[#FFA64D]"
            svg={<Clock color="#FFFBFA" />}
            title="Pending Received"
            selectedPeriod={
              periodData.type === "period" ? periodData.period : "custom"
            }
            amount={totalPendingReceived}
            totalTillNow={totalPendingReceivedTillNow}
          />
          <MainCard
            bg="bg-[#4d9fff1a]"
            svgBg="bg-[#4D9FFF]"
            svg={<Clock color="#FFFBFA" />}
            title="Pending Sent"
            selectedPeriod={
              periodData.type === "period" ? periodData.period : "custom"
            }
            amount={totalPendingSent}
            totalTillNow={totalPendingSentTillNow}
          />
        </div>
      </div>
    </div>
  );
};

export default MainCards;
