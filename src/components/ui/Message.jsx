import React from "react";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

const Message = ({ type, message }) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          darkTextColor: "dark:text-green-400",
          Icon: CheckCircle,
        };
      case "error":
        return {
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          darkTextColor: "dark:text-red-400",
          Icon: AlertCircle,
        };
      case "warning":
        return {
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          darkTextColor: "dark:text-yellow-400",
          Icon: AlertTriangle,
        };
      default:
        return {
          bgColor: "bg-blue-50",
          textColor: "text-blue-800",
          darkTextColor: "dark:text-blue-400",
          Icon: AlertCircle,
        };
    }
  };

  const { bgColor, textColor, darkTextColor, Icon } = getTypeStyles();

  return (
    <div
      className={`p-4 mb-4 w-full text-sm ${textColor} rounded-lg ${bgColor} dark:bg-gray-800 ${darkTextColor} flex items-center`}
      role="alert"
    >
      <Icon className="w-5 h-5 mr-2" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Message;
