import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { aiAutomation } from "@/content/service-details/ai-automation";

export const metadata: Metadata = {
  title: aiAutomation.metaTitle,
  description: aiAutomation.metaDescription,
};

export default function AiAutomationPage() {
  return <ServiceDetailPage detail={aiAutomation} />;
}
