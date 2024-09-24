"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@public/logo.svg";
import Image from "next/image";
import Input from "@/components/ui/Input";
import axiosInstance from "@/utils/axios";
import CustomButton from "../ui/CustomBtn";
import Label from "../ui/Label";

const LoginComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!loginIdentifier.trim() || !password.trim()) {
      setError("Please provide both email/phone and password");
      setLoading(false);
      return;
    }
    
    try {
      const response = await axiosInstance.post("api/v1/staff/accounts-login", {
        loginIdentifier,
        password,
      });

      console.log("Response from API:", response.data);
      setLoading(false);
      if (response.status === 200) {
        const { staffToken } = response.data;
        localStorage.setItem("accountToken", staffToken);
        router.push("/");
        console.log("Login successful");
      } else if (response.status === 401) {
        setErrorMessage("Incorrect email or password");
      } else if (response.status === 403) {
        setErrorMessage("Not Authorized");
      } else {
        console.error("An error occurred:", response.data.error);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.error || "An error occurred");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-[#F2F2F2] min-h-screen flex items-center justify-center lg:py-20 lg:px-20">
      <div className="container mx-auto px-2">
        <div
          style={{ boxShadow: "0px 4px 12px 0px rgba(3, 12, 50, 0.16)" }}
          className="flex item-center justify-between p-4 sm:p-8 gap-4 rounded-2xl bg-[#FFFBFA]"
        >
          <div className="w-full lg:max-h-[43rem] bg-[#F2F2F2] rounded-lg border-[#F4F1EB]">
            <div className="p-4 md:p-6 flex flex-col gap-12">
              <div className="flex flex-col items-center text-center gap-4">
                <div>
                  <Image src={Logo} className="w-20 h-20" alt="Company Logo" />
                </div>
                <div>
                  <div>
                    <div className="text-xl md:text-2xl font-semibold">
                      Login into your account.
                    </div>
                  </div>
                </div>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={handleLoginSubmit}
                autoComplete="false"
              >
                {error && (
                  <div
                    className="p-4 mb-4 w-full md:w-[26rem] text-sm text-red-800 rounded-lg bg-red-50"
                    role="alert"
                  >
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <Label label="Email or Phone #" htmlFor="email" />
                  <Input
                    type="text"
                    placeholder="Email or Phone #"
                    name="loginIdentifier"
                    id="email"
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                  />
                  <Label label="Password" htmlFor="password" />
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <CustomButton
                    type="submit"
                    loading={loading}
                    txt="Login"
                    bg="bg-[#107243]"
                    color="text-[#FFFBFA]"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="hidden w-full lg:max-h-[43rem] loginImage rounded-lg overflow-hidden p-4 xl:flex flex-col justify-between">
            <div className="w-full flex items-center justify-center"></div>
            <div className="w-full text-base lg:text-3xl font-normal mb-6 text-[#FFFDFA]">
              Empowering Your Manpower Maids Service with Seamless Access and
              Efficiency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
