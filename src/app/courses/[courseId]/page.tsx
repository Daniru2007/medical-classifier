type CarProps = {
  params:Promise<{
    courseId:string
  }>;
}

export async function generateStaticParams(){
  const res = await fetch("http://localhost:3000/courses.json")
  const courses: {courseId:string}[] = await res.json();
  return courses.map(course => ({courseId: course.courseId}));
}
export default async function CarID({params}:CarProps) {
  const {courseId} = await params;
  return (
    <h1>Course is {courseId}</h1>
  );
}
