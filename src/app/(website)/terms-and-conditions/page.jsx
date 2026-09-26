import LegalPolicyPageRenderer, { createPolicyMetadata } from "../_legalPage";

export const revalidate = 600;

export async function generateMetadata() {
  return createPolicyMetadata("terms-and-conditions");
}

export default function TermsAndConditionsPage() {
  return <LegalPolicyPageRenderer slug="terms-and-conditions" />;
}
