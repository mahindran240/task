import { fetchProfile } from "../api/studentApi";
import PageHeader from "../components/PageHeader";
import { EmptyState, FallbackNotice, LoadingState } from "../components/PageState";
import useApiResource from "../hooks/useApiResource";

export default function StudentProfile() {
  const { data, loading, error, source } = useApiResource(fetchProfile);

  if (loading) return <LoadingState label="Loading profile" />;
  if (!data) return <EmptyState message="Student profile could not be loaded." />;

  return (
    <section className="page-stack">
      <PageHeader
        title="Student Profile"
        subtitle="Profile information is rendered from the service layer, whether live or mocked."
      />
      <FallbackNotice source={source} error={error} />

      <section className="profile-panel">
        <div className="avatar">{data.avatarInitials}</div>
        <div className="profile-main">
          <h3>{data.name}</h3>
          <p>{data.program}</p>
          <div className="profile-meta">
            <span>{data.id}</span>
            <span>{data.year}</span>
            <span>Advisor: {data.advisor}</span>
          </div>
        </div>
      </section>

      <div className="info-grid">
        <article className="panel">
          <h3>Contact</h3>
          <dl className="detail-list">
            <div>
              <dt>Email</dt>
              <dd>{data.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{data.phone}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{data.address}</dd>
            </div>
          </dl>
        </article>

        <article className="panel">
          <h3>Academic Snapshot</h3>
          <div className="snapshot-grid">
            <div>
              <span>GPA</span>
              <strong>{data.gpa}</strong>
            </div>
            <div>
              <span>Credits</span>
              <strong>{data.creditsCompleted}</strong>
            </div>
          </div>
          <div className="tag-row">
            {data.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
