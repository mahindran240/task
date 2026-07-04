import { fetchAttendance } from "../api/studentApi";
import PageHeader from "../components/PageHeader";
import { EmptyState, FallbackNotice, LoadingState } from "../components/PageState";
import useApiResource from "../hooks/useApiResource";

export default function Attendance() {
  const { data, loading, error, source } = useApiResource(fetchAttendance);

  if (loading) return <LoadingState label="Loading attendance" />;
  if (!data?.length) return <EmptyState message="No attendance records available." />;

  const average = Math.round(
    data.reduce((total, item) => total + item.percentage, 0) / data.length
  );

  return (
    <section className="page-stack">
      <PageHeader
        title="Attendance"
        subtitle="Course-wise attendance loaded through the same API fallback pattern."
        action={<span className="average-pill">Average {average}%</span>}
      />
      <FallbackNotice source={source} error={error} />

      <div className="attendance-list">
        {data.map((item) => (
          <article className="attendance-row" key={item.course}>
            <div>
              <h3>{item.course}</h3>
              <p>
                {item.attended} attended of {item.total} classes
              </p>
            </div>
            <strong>{item.percentage}%</strong>
            <div className="progress-track" aria-label={`${item.course} attendance`}>
              <span style={{ width: `${item.percentage}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
