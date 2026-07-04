// Server wrapper for the demo route: same slug set as the course pages.
import courseDetails from "@/data/courseDetails.json";
import categories from "@/data/courses.json";
import DemoClient from "./DemoClient";

export function generateStaticParams() {
  const ids = new Set(courseDetails.map((c) => c.id));
  categories.forEach((cat) => (cat.courses || []).forEach((c) => ids.add(c.id)));
  return [...ids].map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default function Page() {
  return <DemoClient />;
}
