import { fetchDashboard } from "../api/studentApi";
import PageHeader from "../components/PageHeader";
import { EmptyState, FallbackNotice, LoadingState } from "../components/PageState";
import useApiResource from "../hooks/useApiResource";

export default function Dashboard() {
  const { data, loading, error, source } = useApiResource(fetchDashboard);

  if (loading) return <LoadingState label="Loading dashboard" />;
  if (!data) return <EmptyState message="Dashboard data could not be loaded." />;

  return (
    <section className="page-stack">
      <PageHeader
        title="Dashboard"
        subtitle="A quick view of student activity, course progress, and important academic dates."
      />
      <FallbackNotice source={source} error={error} />

      <div className="metric-grid">
        {data.summary.map((item) => (
          <article className="metric-card" key={item.label}>
            <p>{item.label}</p>
            <strong>{item.value}</strong>
            <span>{item.change}</span>
          </article>
        ))}
      </div>

      <div className="two-column">
        <section className="panel">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            {data.recentActivities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h3>Upcoming</h3>
          <div className="timeline">
            {data.upcoming.map((event) => (
              <article key={event.title}>
                <div>
                  <strong>{event.date}</strong>
                  <span>{event.time}</span>
                </div>
                <p>{event.title}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
