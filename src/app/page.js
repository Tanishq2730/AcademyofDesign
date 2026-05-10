import Hero from "@/components/Home/Hero";
import ClientLogos from "@/components/Home/ClientLogos";
import Banner from "@/components/Home/Banner";
import Courses from "@/components/Home/Courses";
import Instructors from "@/components/Home/Instructors";
import Workshops from "@/components/Home/Workshops";
import CTA from "@/components/Home/CTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ClientLogos />
      <Banner />
      <Courses />
      <Instructors />
      <CTA />
      <Workshops />
    </div>
  );
}
