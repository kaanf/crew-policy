import LegalPage from "@/components/LegalPage";
import { getLegalDocument } from "@/lib/legal-docs";

export const metadata = {
  title: "Delete Your Crew Account",
  description:
    "How to delete your Crew account from the app or by email, what data is removed, and how long it takes."
};

export default function DeleteAccountPage() {
  return <LegalPage document={getLegalDocument("delete-account")} />;
}
