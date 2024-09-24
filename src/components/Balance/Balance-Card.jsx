import React from "react";

const BalanceCard = ({ bg, svg, svgBg, title, amount }) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        bg ? bg : "bg-[#7DFFE91A]"
      } flex items-center gap-4 text-[#262F32]`}
    >
      <div
        className={`p-3 rounded-2xl ${svgBg ? svgBg : "bg-[#7DFFE9]"} w-max`}
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
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-2xl font-bold flex items-center gap-1">
          {amount}{" "}
          <span className="text-xs font-normal text-[#434146]">OMR</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
