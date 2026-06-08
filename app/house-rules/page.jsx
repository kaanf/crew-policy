import LegalPage from "@/components/LegalPage";
import { getLegalDocument } from "@/lib/legal-docs";

export const metadata = {
  title: "Crew House Rules",
  description:
    "The safety, consent, venue, and gameplay rules for every Crew event."
};

export default function HouseRulesPage() {
  return <LegalPage document={getLegalDocument("house-rules")} />;
}
