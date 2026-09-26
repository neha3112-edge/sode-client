import ReviewsPageRenderer, { createReviewsMetadata } from "../_reviewsPage";

export const revalidate = 60;

export async function generateMetadata() {
  return createReviewsMetadata("distance-education-school-reviews");
}

export default function DistanceEducationSchoolReviewsPage() {
  return <ReviewsPageRenderer />;
}
