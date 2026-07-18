import type { Metadata } from "next";
import { ProductPage } from "../components/product-page";

export const metadata: Metadata = {
  title: "Disclera Report | Disclosures you can defend",
  description: "Assemble audit-ready sustainability disclosures from approved evidence with review and full lineage.",
};

export default function ReportPage() {
  return <ProductPage product="report" />;
}
