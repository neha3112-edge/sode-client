import ReviewsPageRenderer, { createReviewsMetadata } from "../_reviewsPage";

export const revalidate = 60;

export async function generateMetadata() {
  return createReviewsMetadata("reviews");
}

export default function ReviewsAliasPage() {
  return <ReviewsPageRenderer />;
}
