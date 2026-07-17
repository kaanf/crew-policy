import LegalPage from "@/components/LegalPage";
import { getLegalDocument } from "@/lib/legal-docs";

export const metadata = {
  title: "Crew Support",
  description:
    "How to contact us and answers to common questions about accounts, tickets, and events."
};

export default function SupportPage() {
  return <LegalPage document={getLegalDocument("support")} />;
}
