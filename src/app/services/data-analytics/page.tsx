import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { dataAnalytics } from "@/content/service-details/data-analytics";

export const metadata: Metadata = pageMetadata({
  title: dataAnalytics.metaTitle,
  description: dataAnalytics.metaDescription,
  path: "/services/data-analytics",
});

export default function DataAnalyticsPage() {
  return <ServiceDetailPage detail={dataAnalytics} />;
}
