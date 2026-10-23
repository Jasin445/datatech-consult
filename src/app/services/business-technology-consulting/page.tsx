import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { businessTechnologyConsulting } from "@/content/service-details/business-technology-consulting";

export const metadata: Metadata = {
  title: businessTechnologyConsulting.metaTitle,
  description: businessTechnologyConsulting.metaDescription,
};

export default function BusinessTechnologyConsultingPage() {
  return <ServiceDetailPage detail={businessTechnologyConsulting} />;
}
