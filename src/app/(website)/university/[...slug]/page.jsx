import { redirect } from "next/navigation";

export const revalidate = 900;

export default async function UniversityPageRedirect({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;
  const slugPath = Array.isArray(rawSlug) ? rawSlug.join("/") : (rawSlug || "");
  redirect(`/universities/${slugPath}`);
}
