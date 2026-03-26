import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import LeadMagnet from "@/components/sections/LeadMagnet";
import BlogPreview from "@/components/sections/BlogPreview";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import WaveDivider from "@/components/ui/WaveDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WaveDivider color="#ffffff" />
      <Stats />
      <WaveDivider color="#ffffff" flip />
      <Services />
      <HowItWorks />
      <WaveDivider color="#ffffff" />
      <LeadMagnet />
      <WaveDivider color="#ffffff" flip />
      <BlogPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
