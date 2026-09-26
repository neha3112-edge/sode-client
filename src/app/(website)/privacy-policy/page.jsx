import LegalPolicyPageRenderer, { createPolicyMetadata } from "../_legalPage";

export const revalidate = 600;

export async function generateMetadata() {
  return createPolicyMetadata("privacy-policy");
}

export default function PrivacyPolicyPage() {
  return <LegalPolicyPageRenderer slug="privacy-policy" />;
}
