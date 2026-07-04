import { fetchCourses } from "../api/studentApi";
import PageHeader from "../components/PageHeader";
import { EmptyState, FallbackNotice, LoadingState } from "../components/PageState";
import useApiResource from "../hooks/useApiResource";

export default function Courses() {
  const { data, loading, error, source } = useApiResource(fetchCourses);

  if (loading) return <LoadingState label="Loading courses" />;
  if (!data?.length) return <EmptyState message="No courses available." />;

  return (
    <section className="page-stack">
      <PageHeader
        title="Courses"
        subtitle="Track enrolled courses, instructors, credits, and completion progress."
      />
      <FallbackNotice source={source} error={error} />

      <div className="course-grid">
        {data.map((course) => (
          <article className="course-card" key={course.code}>
            <div className="course-topline">
              <span>{course.code}</span>
              <strong>{course.credits} credits</strong>
            </div>
            <h3>{course.title}</h3>
            <p>{course.instructor}</p>
            <div className="progress-label">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="progress-track" aria-label={`${course.title} progress`}>
              <span style={{ width: `${course.progress}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
