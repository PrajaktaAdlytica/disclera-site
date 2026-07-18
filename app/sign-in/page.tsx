import type { Metadata } from "next";
import { SignInPage } from "../components/access-pages";

export const metadata: Metadata = {
  title: "Sign in | Disclera",
  description: "Secure access to your Disclera sustainability reporting workspace.",
};

export default function SignInRoute() {
  return <SignInPage />;
}
