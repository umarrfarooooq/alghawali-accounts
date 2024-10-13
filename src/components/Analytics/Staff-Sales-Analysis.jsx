import React from "react";
import {
  Users,
  UserCheck,
  UserMinus,
  Trophy,
  Award,
  Medal,
  CheckCircle,
} from "lucide-react";

const RankIcon = ({ rank }) => {
  switch (rank) {
    case 1:
      return <Trophy size={24} color="#FFD700" />;
    case 2:
      return <Award size={24} color="#C0C0C0" />;
    case 3:
      return <Medal size={24} color="#CD7F32" />;
    default:
      return <span className="text-sm font-bold text-gray-500">{rank}th</span>;
  }
};

const StaffSalesAnalysis = ({ staffAnalytics }) => {
  return (
    <div className="flex flex-col gap-2">
      {staffAnalytics.map((staff, index) => (
        <div
          key={staff.staffId}
          className="bg-white rounded-lg border border-[#031d921a] p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <RankIcon rank={index + 1} />
              <h3 className="text-lg font-semibold text-gray-800">
                {staff.staffName || "- - -"}
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="text-xs text-gray-500">Total Customers</div>
              <div className="text-sm text-gray-800 font-semibold flex items-center gap-1">
                <Users size={16} className="text-blue-500" />
                <span>{staff.totalCustomers}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Active Customers</div>
              <div className="text-sm text-gray-800 font-semibold flex items-center gap-1">
                <UserCheck size={16} className="text-green-500" />
                <span>{staff.activeCustomers}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Completed Customers</div>
              <div className="text-sm text-gray-800 font-semibold flex items-center gap-1">
                <CheckCircle size={16} className="text-green-500" />
                <span>{staff.completedCustomers}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Returned Customers</div>
              <div className="text-sm text-gray-800 font-semibold flex items-center gap-1">
                <UserMinus size={16} className="text-red-500" />
                <span>{staff.returnedCustomers}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Received</div>
              <div className="text-sm text-gray-800 font-semibold flex items-center gap-1">
                <span>{staff.totalReceivedAmount} OMR</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffSalesAnalysis;
