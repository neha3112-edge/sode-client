import { amityData } from "@/data/landing/amity";
import UniversityLandingView from "@/components/landing/UniversityLandingView";

export const metadata = amityData.meta;

export default function AmityPage() {
  return <UniversityLandingView data={amityData} />;
}
