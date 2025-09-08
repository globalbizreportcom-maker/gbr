import CustomersIndustries from "@/components/CustomersIndustries";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import { Highlights } from "@/components/Highlights";
import ReportContains from "@/components/ReportContains";
import Subscription from "@/components/Subscription";
import WhyGBRSection from "@/components/WhyGBRSection";

export default function Home() {
  return (
    <div className="w-full ">

      <HeroSection />
      <Highlights />
      <Features />
      <ReportContains />
      <WhyGBRSection />
      <CustomersIndustries />
      <Subscription />
    </div>
  );
}
