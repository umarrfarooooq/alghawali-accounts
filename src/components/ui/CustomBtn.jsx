"use client";
import Link from "next/link";
import React, { useState, forwardRef } from "react";
import { Loader2 } from "lucide-react";

const CustomButton = forwardRef(
  (
    {
      icon,
      txt,
      bg,
      color,
      border,
      link,
      type,
      loading,
      className,
      disableLoadingOnClick,
      onClick,
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (e) => {
      if (type === "submit") {
        if (onClick) onClick(e);
      } else {
        if (!disableLoadingOnClick) {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 2000);
        }
        if (onClick) onClick(e);
      }
    };

    const ButtonContent = () => (
      <>
        <div>
          {isLoading || loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            icon
          )}
        </div>
        <div className="text-sm font-[550]">{txt}</div>
      </>
    );

    const buttonClass = `
    p-3 flex items-center w-full min-w-max justify-center cursor-pointer gap-1 rounded-lg
    ${bg} ${color} ${border} ${className}
    transition-all duration-300 ease-in-out
    hover:brightness-110 hover:shadow-md
    active:brightness-90 active:scale-95
    disabled:cursor-not-allowed ${bg ? "disabled:bg-gray-500" : ""}
  `;

    if (link && type !== "submit") {
      return (
        <Link
          href={link}
          onClick={handleClick}
          className={buttonClass}
          ref={ref}
        >
          <button
            className="flex items-center gap-1"
            disabled={isLoading || loading}
            type={type || "button"}
          >
            <ButtonContent />
          </button>
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isLoading || loading}
        type={type || "button"}
        className={buttonClass}
        onClick={handleClick}
      >
        <ButtonContent />
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
