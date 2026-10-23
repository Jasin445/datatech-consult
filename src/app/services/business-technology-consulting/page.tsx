import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { businessTechnologyConsulting } from "@/content/service-details/business-technology-consulting";

export const metadata: Metadata = pageMetadata({
  title: businessTechnologyConsulting.metaTitle,
  description: businessTechnologyConsulting.metaDescription,
  path: "/services/business-technology-consulting",
});

export default function BusinessTechnologyConsultingPage() {
  return <ServiceDetailPage detail={businessTechnologyConsulting} />;
}
