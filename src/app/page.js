"use client"
import Header from "@/components/Header/Header";
import ActionBar from "@/components/Home/Action-Bar";
import MainCards from "@/components/Home/Main-Cards";
import TabsSection from "@/components/Home/Tabs-Section";
import AuthRedirect from "@/lib/AuthRedirect";

export default function Home() {
  return (
    <>
      <AuthRedirect requireAuth={true}>
        <div className="bg-[#F2F5FF] min-h-screen pb-8">
          <div className="flex flex-col gap-4 md:gap-8">
            <Header />
            <ActionBar />
            <MainCards />
            <TabsSection />
          </div>
        </div>
      </AuthRedirect>
    </>
  );
}
