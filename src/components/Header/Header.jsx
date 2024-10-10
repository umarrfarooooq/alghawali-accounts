import React, { useState } from "react";
import Logo from "@public/logo2.svg";
import Avatar from "@public/avatar.jpg";
import Image from "next/image";
import Link from "next/link";
import { VerifyStaffToken } from "@/lib/VerifyStaffToken";
import { ChevronDown } from "lucide-react";
import Logout from "../Logout/Logout";
const Header = () => {
  const [logoutPopup, setLogoutPopup] = useState(false);
  const { staffName } = VerifyStaffToken();
  return (
    <>
      <div className="px-4 md:px-8 mt-4 md:mt-8">
        <div className="flex items-center justify-between p-4 md:p-6 gap-1 sm:gap-4 bg-[#253061] rounded-xl text-[#FFFBFA]">
          <Link href="/">
            <div>
              <Image
                src={Logo}
                width={32}
                height={32}
                alt="company logo"
                className="w-auto h-auto sm:w-12 sm:h-12 object-contain"
              />
            </div>
          </Link>
          <div className="flex flex-col gap-2 items-end">
            <div className="text-base w-max sm:w-auto md:text-3xl font-semibold sm:font-bold text-balance text-center">
              Al Ghawali Accounts Panel
            </div>
            <div className="block sm:hidden">
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={Avatar}
                    width={500}
                    height={500}
                    alt="profile avatar"
                    className="w-12 h-12 sm:w-12 sm:h-12 object-cover rounded-full"
                  />
                </div>
                <div
                  className="cursor-pointer relative"
                  onClick={() => setLogoutPopup(!logoutPopup)}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    {staffName ? staffName : "Guest"}
                  </p>
                  <Logout className="text-sm text-red-400 font-normal flex items-center gap-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src={Avatar}
                  width={500}
                  height={500}
                  alt="profile avatar"
                  className="w-12 h-12 sm:w-12 sm:h-12 object-cover rounded-full"
                />
              </div>
              <div
                className="cursor-pointer relative"
                onClick={() => setLogoutPopup(!logoutPopup)}
              >
                <p className="flex items-center gap-2 text-sm font-semibold">
                  {staffName ? staffName : "Guest"}
                </p>
                <Logout className="text-sm text-red-400 font-normal flex items-center gap-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
