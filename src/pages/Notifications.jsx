import { fetchNotifications } from "../api/studentApi";
import PageHeader from "../components/PageHeader";
import { EmptyState, FallbackNotice, LoadingState } from "../components/PageState";
import useApiResource from "../hooks/useApiResource";

export default function Notifications() {
  const { data, loading, error, source } = useApiResource(fetchNotifications);

  if (loading) return <LoadingState label="Loading notifications" />;
  if (!data?.length) return <EmptyState message="No notifications right now." />;

  return (
    <section className="page-stack">
      <PageHeader
        title="Notifications"
        subtitle="Messages keep rendering even while the backend service is still unavailable."
      />
      <FallbackNotice source={source} error={error} />

      <div className="notification-list">
        {data.map((notification) => (
          <article className="notification-item" key={notification.id}>
            <div>
              <span className="notification-type">{notification.type}</span>
              <h3>{notification.message}</h3>
              <p>{notification.time}</p>
            </div>
            <span className={`priority priority-${notification.priority.toLowerCase()}`}>
              {notification.priority}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
