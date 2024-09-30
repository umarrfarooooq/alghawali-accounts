import React, { useEffect, useState } from "react";
import MainCard from "@/components/Main-Card/Main-Card";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Clock, IdCard, Shirt } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import AmountPeriod from "../Main-Card/amountPeriod";
import CustomLoading from "../ui/CustomLoading";
import roles from "@/lib/roles";
const fetchCardData = async (period) => {
  const { verifyToken } = VerifyStaffToken();
  const { data } = await axiosInstance.get(
    "api/v1/staffAccounts/all-transactions",
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
  const { roles: staffRoles } = VerifyStaffToken();
  const fullAccess = staffRoles.includes(roles.fullAccessOnAccounts);
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cardData", selectedPeriod],
    queryFn: () => fetchCardData(selectedPeriod),
    enabled: fullAccess,
    staleTime: 300000,
    retry: 2,
  });

  useEffect(() => {
    if (fullAccess) refetch();
  }, [selectedPeriod, fullAccess]);

  if (!fullAccess) return <></>;

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
    totalTillNowReceived,
    totalTillNowSent,
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
            bg="bg-[#ffa64d1a]"
            svgBg="bg-[#FFA64D]"
            svg={<Clock color="#FFFBFA" />}
            title="Pending Received"
            selectedPeriod={selectedPeriod}
            amount={totalPendingReceived}
            totalTillNow={totalPendingReceivedTillNow}
          />
          <MainCard
            bg="bg-[#4d9fff1a]"
            svgBg="bg-[#4D9FFF]"
            svg={<Clock color="#FFFBFA" />}
            title="Pending Sent"
            selectedPeriod={selectedPeriod}
            amount={totalPendingSent}
            totalTillNow={totalPendingSentTillNow}
          />
        </div>
      </div>
    </div>
  );
};

export default MainCards;
