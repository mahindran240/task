import { fetchStudents } from "../api/studentApi";
import PageHeader from "../components/PageHeader";
import { EmptyState, FallbackNotice, LoadingState } from "../components/PageState";
import useApiResource from "../hooks/useApiResource";

export default function StudentList() {
  const { data, loading, error, source } = useApiResource(fetchStudents);

  if (loading) return <LoadingState label="Loading students" />;
  if (!data?.length) return <EmptyState message="No students found." />;

  return (
    <section className="page-stack">
      <PageHeader
        title="Student List"
        subtitle="Browse students using the same data shape expected from the future backend."
      />
      <FallbackNotice source={source} error={error} />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>ID</th>
              <th>Department</th>
              <th>Year</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.id}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.email}</td>
                <td>
                  <span className={`status status-${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
