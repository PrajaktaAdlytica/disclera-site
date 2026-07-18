import type { Metadata } from "next";
import { ProductPage } from "../components/product-page";

export const metadata: Metadata = {
  title: "Disclera Suppliers | Value-chain reporting in rhythm",
  description: "Create proportionate supplier requests, collect evidence and build assurance-ready value-chain reporting.",
};

export default function SuppliersPage() {
  return <ProductPage product="suppliers" />;
}
