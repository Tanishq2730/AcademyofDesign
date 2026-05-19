"use client";
import CoursesHero from "@/components/Courses/CoursesHero";
import CoursesCatalog from "@/components/Courses/CoursesCatalog";
import CoursesCTA from "@/components/Courses/CoursesCTA";

export default function CoursesPage() {
  return (
    <main>
      <CoursesHero />
      <CoursesCatalog />
      <CoursesCTA />
    </main>
  );
}
