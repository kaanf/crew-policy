import LegalPage from "@/components/LegalPage";
import { getLegalDocument } from "@/lib/legal-docs";

export const metadata = {
  title: "Crew Privacy Policy",
  description:
    "How Crew collects, uses, shares, and protects information when you use the app."
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={getLegalDocument("privacy-policy")} />;
}
