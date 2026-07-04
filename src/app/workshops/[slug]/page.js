// Server wrapper: pre-generates a static page for every workshop slug.
// The interactive UI lives in the client component below.
import workshopsList from "@/data/workshops.json";
import WorkshopDetailClient from "./WorkshopDetailClient";

export function generateStaticParams() {
  return workshopsList.map((w) => ({ slug: w.id }));
}

// Only the slugs above are valid; anything else 404s in the static export.
export const dynamicParams = false;

export default function Page() {
  return <WorkshopDetailClient />;
}
