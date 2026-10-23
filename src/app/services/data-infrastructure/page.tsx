import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { dataInfrastructure } from "@/content/service-details/data-infrastructure";

export const metadata: Metadata = {
  title: dataInfrastructure.metaTitle,
  description: dataInfrastructure.metaDescription,
};

export default function DataInfrastructurePage() {
  return <ServiceDetailPage detail={dataInfrastructure} />;
}
