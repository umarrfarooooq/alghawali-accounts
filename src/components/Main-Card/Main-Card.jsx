import { Check, Clock } from "lucide-react";
import React from "react";

const MainCard = ({
  title,
  amount,
  totalTillNow,
  svg,
  cursor,
  bg,
  svgBg,
  pending,
  pendingAmount,
  pendingTotalTillNow,
  selectedPeriod,
}) => {
  return (
    <>
      <div className="w-full sm:w-auto">
        <div
          className={`min-h-[12rem] w-full ${
            cursor ? "cursor-pointer" : ""
          } p-4 ${
            bg ? bg : "bg-white"
          } text-[#262F32] rounded-lg flex flex-col gap-4 justify-between`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl ${svgBg ? svgBg : "bg-[#EBEBEB]"}`}
            >
              {svg ? (
                svg
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.125 13.125L9.375 18.375L19.875 7.125"
                    stroke="#262F32"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div className="text-sm font-bold">
              {title ? title : "Hired By Client"}
            </div>
          </div>

          <div className="flex flex-col overflow-auto">
            <div className="flex items-center gap-1">
              {pending && <Check />}
              <span className="text-[2rem] text-[#262F32] font-bold">
                {amount ? amount : "00"}{" "}
              </span>
              <span className="text-xs text-[#434146] uppercase">
                OMR this{" "}
                {selectedPeriod === "Monthly"
                  ? "month"
                  : selectedPeriod === "Yearly"
                  ? "year"
                  : selectedPeriod === "Weekly"
                  ? "week"
                  : selectedPeriod}
              </span>
            </div>
            {pending && (
              <div className="flex items-center gap-1">
                <Clock />
                <span className="text-[2rem] text-[#262F32] font-bold">
                  {pendingAmount ? pendingAmount : "00"}{" "}
                </span>
                <span className="text-xs text-[#434146] uppercase">
                  OMR this{" "}
                  {selectedPeriod === "Monthly"
                    ? "month"
                    : selectedPeriod === "Yearly"
                    ? "year"
                    : selectedPeriod === "Weekly"
                    ? "week"
                    : selectedPeriod}
                </span>
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-col overflow-auto">
              <div className="flex items-center gap-1">
                <div>{pending && <Check width={16} />}</div>
                <div>
                  Total till now{" "}
                  <span className="text-base font-bold text-[#262F32]">
                    {totalTillNow !== undefined ? (
                      <span>{totalTillNow} </span>
                    ) : (
                      <span>{amount}</span>
                    )}{" "}
                    <span>OMR</span>
                  </span>
                </div>
              </div>
              {pending && (
                <div className="flex items-center gap-1">
                  <div>
                    <Clock width={16} />
                  </div>
                  <div>
                    Total till now{" "}
                    <span className="text-base font-bold text-[#262F32]">
                      {pendingTotalTillNow !== undefined ? (
                        <span>{pendingTotalTillNow} </span>
                      ) : (
                        <span>{pendingAmount}</span>
                      )}{" "}
                      <span>OMR</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCard;
