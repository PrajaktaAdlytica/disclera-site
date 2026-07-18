import type { Metadata } from "next";
import { ProductPage } from "../components/product-page";

export const metadata: Metadata = {
  title: "Disclera Collect | Bring every piece of evidence into focus",
  description: "A governed evidence workspace for audit-ready CSRD, ESRS and VSME reporting.",
};

export default function CollectPage() {
  return <ProductPage product="collect" />;
}
