import React from "react";
import Logo from "@public/logo2.svg";
import Avatar from "@public/avatar.jpg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
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
                className="w-12 h-12 object-contain"
              />
            </div>
          </Link>

          <div className="text-base w-max sm:w-auto md:text-3xl font-semibold sm:font-bold text-balance text-center">
            Al Ghawali Accounts Panel
          </div>
          <div className="hidden sm:block">
            <Image
              src={Avatar}
              width={500}
              height={500}
              alt="profile avatar"
              className="w-12 h-12 sm:w-12 sm:h-12 object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
