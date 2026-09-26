import LegalPolicyPageRenderer, { createPolicyMetadata } from "../_legalPage";

export const revalidate = 600;

export async function generateMetadata() {
  return createPolicyMetadata("disclaimer");
}

export default function DisclaimerPage() {
  return <LegalPolicyPageRenderer slug="disclaimer" />;
}
