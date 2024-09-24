import { Loader2 } from "lucide-react";
import React from "react";

const CustomLoading = ({ fullScreen = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen && "min-h-screen"
      }`}
    >
      <Loader2 color="#253061" className="mr-2 h-12 w-12 animate-spin" />
    </div>
  );
};

export default CustomLoading;
