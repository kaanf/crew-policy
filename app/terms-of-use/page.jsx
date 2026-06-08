import LegalPage from "@/components/LegalPage";
import { getLegalDocument } from "@/lib/legal-docs";

export const metadata = {
  title: "Crew Terms of Use",
  description:
    "The terms that govern your access to and use of Crew and related services."
};

export default function TermsOfUsePage() {
  return <LegalPage document={getLegalDocument("terms-of-use")} />;
}
