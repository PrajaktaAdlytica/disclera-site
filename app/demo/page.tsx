import type { Metadata } from "next";
import { DemoPage } from "../components/access-pages";

export const metadata: Metadata = {
  title: "Request a tailored demo | Disclera",
  description: "See how Disclera can bring your sustainability evidence, suppliers and disclosures into order.",
};

export default function DemoRoute() {
  return <DemoPage />;
}
