import { HeroSection } from "@/components/sections/home/HeroSection";
import { TrustStrip } from "@/components/sections/home/TrustStrip";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { WorkflowSection } from "@/components/sections/home/WorkflowSection";
import { EquipmentShowcaseSection } from "@/components/sections/home/EquipmentShowcaseSection";
import { IndustriesSection } from "@/components/sections/home/IndustriesSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { InnovationSection } from "@/components/sections/home/InnovationSection";
import { PartnershipBridge } from "@/components/sections/home/PartnershipBridge";
import { FeaturedPartners } from "@/components/sections/home/FeaturedPartners";
import { AnimatedStatsCounter } from "@/components/sections/home/AnimatedStatsCounter";
import { ProjectsShowcase } from "@/components/sections/home/ProjectsShowcase";
import { FounderPreview } from "@/components/sections/home/FounderPreview";
import { ContactCta } from "@/components/sections/home/ContactCta";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1 */}  <HeroSection />
      {/* 2 */}  <TrustStrip />
      {/* 3 */}  <AboutPreview />
      {/* 4 */}  <ServicesSection />
      {/* 5 */}  <EquipmentShowcaseSection />
      {/* 6 */}  <IndustriesSection />
      {/* 7 */}  <WorkflowSection />
      {/* 8 */}  <WhyChooseUsSection />
      {/* 9 */}  <InnovationSection />
      {/* 10 */ } <PartnershipBridge />
      {/* 11 */ } <FeaturedPartners />
      {/* 12 */ } <AnimatedStatsCounter />
      {/* 13 */ } <ProjectsShowcase />
      {/* 14 */ } <FounderPreview />
      {/* 15 */ } <ContactCta />
    </div>
  );
}
