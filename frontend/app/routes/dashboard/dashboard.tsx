import type { Route } from "./+types/dashboard";
import { ClassCard } from "./class-card";

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const user = loaderData.user;
  const courses = loaderData.courses;

  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="text-2xl font-bold">Hello, {user.name}!</div>
      <div>Your courses</div>
      <div className="grid grid-cols-3">
        {courses.map((course, index) => (
          <ClassCard 
            name={course.name}
            imageSrc=""
            imageAlt="Course image"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export async function loader() {
  return {
    user: {
      name: "Test",
    },
    courses: [
      {
        name: "Pemrograman Lanjut",
        image: "/favicon.ico",
      }
    ]
  };
}
