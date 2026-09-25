import { smuData } from "@/data/landing/smu";
import UniversityLandingView from "@/components/landing/UniversityLandingView";

export const metadata = smuData.meta;

export default function SMUPage() {
  return <UniversityLandingView data={smuData} />;
}
