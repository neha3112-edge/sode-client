import { vguData } from "@/data/landing/vgu";
import UniversityLandingView from "@/components/landing/UniversityLandingView";

export const metadata = vguData.meta;

export default function VGUPage() {
  return <UniversityLandingView data={vguData} />;
}
