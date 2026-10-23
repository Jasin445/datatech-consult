import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { aiAutomation } from "@/content/service-details/ai-automation";

export const metadata: Metadata = pageMetadata({
  title: aiAutomation.metaTitle,
  description: aiAutomation.metaDescription,
  path: "/services/ai-automation",
});

export default function AiAutomationPage() {
  return <ServiceDetailPage detail={aiAutomation} />;
}
