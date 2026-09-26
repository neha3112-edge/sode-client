import { shooliniData } from "@/data/landing/shoolini";
import UniversityLandingView from "@/components/landing/UniversityLandingView";

export const metadata = shooliniData.meta;

export default function ShooliniPage() {
  return <UniversityLandingView data={shooliniData} />;
}
