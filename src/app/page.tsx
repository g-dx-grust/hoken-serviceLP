import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Problems } from "@/components/sections/problems";
import { Solution } from "@/components/sections/solution";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { ScreensGallery } from "@/components/sections/screens-gallery";
import { Comparison } from "@/components/sections/comparison";
import { Personas } from "@/components/sections/personas";
import { Subsidy } from "@/components/sections/subsidy";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problems />
      <Solution />
      <FeaturesGrid />
      <ScreensGallery />
      <Comparison />
      <Personas />
      <Subsidy />
      <Process />
      <Faq />
      <FinalCta />
    </>
  );
}
