import React from "react";
import Logo from "@public/logo2.svg";
import Avatar from "@public/vector.jpg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="px-4 md:px-8 mt-4 md:mt-8">
        <div className="flex items-center justify-between p-4 md:p-6 gap-4 bg-[#253061] rounded-xl text-[#FFFBFA]">
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

          <div className="text-lg md:text-3xl font-bold text-center">
            Al Ghawali Admin Panel
          </div>
          <div>
            <Image
              src={Avatar}
              width={32}
              height={32}
              alt="profile avatar"
              className="w-12 h-12 object-top rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
