import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { dataInfrastructure } from "@/content/service-details/data-infrastructure";

export const metadata: Metadata = pageMetadata({
  title: dataInfrastructure.metaTitle,
  description: dataInfrastructure.metaDescription,
  path: "/services/data-infrastructure",
});

export default function DataInfrastructurePage() {
  return <ServiceDetailPage detail={dataInfrastructure} />;
}
