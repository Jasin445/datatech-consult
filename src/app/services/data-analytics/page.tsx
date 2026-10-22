import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { dataAnalytics } from "@/content/service-details/data-analytics";

export const metadata: Metadata = {
  title: dataAnalytics.metaTitle,
  description: dataAnalytics.metaDescription,
};

export default function DataAnalyticsPage() {
  return <ServiceDetailPage detail={dataAnalytics} />;
}
