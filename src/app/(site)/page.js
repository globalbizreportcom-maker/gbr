import CustomersIndustries from "@/components/CustomersIndustries";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import { Highlights } from "@/components/Highlights";
import ReportContains from "@/components/ReportContains";
import Subscription from "@/components/Subscription";
import Testimonials from "@/components/Testimonials";
import WhyGBRSection from "@/components/WhyGBRSection";

export default function Home() {
  return (
    <div className="w-full ">

      <HeroSection />
      <Highlights />
      <Features />
      <div className="py-10 md:hidden">

        <h2 className="text-md border-0 bg-violet-100 p-2 text-center rounded-md w-full max-w-xs font-bold text-primary mb-5 mx-auto">
          Testimonials
        </h2>

        <Testimonials />
      </div>

      <ReportContains />
      <WhyGBRSection />
      <CustomersIndustries />
      <div className="py-10 hidden md:block">

        <h2 className="text-md border-0 bg-violet-100 p-2 text-center rounded-md w-full max-w-xs font-bold text-primary mb-5 mx-auto">
          Testimonials
        </h2>

        <Testimonials />
      </div>
      <Subscription />
    </div>
  );
}
