import LegalPolicyPageRenderer, { createPolicyMetadata } from "../_legalPage";

export const revalidate = 600;

export async function generateMetadata() {
  return createPolicyMetadata("refund-policy");
}

export default function RefundPolicyPage() {
  return <LegalPolicyPageRenderer slug="refund-policy" />;
}
