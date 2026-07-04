import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import StudentList from "./pages/StudentList.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import Courses from "./pages/Courses.jsx";
import Attendance from "./pages/Attendance.jsx";
import Notifications from "./pages/Notifications.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/students", label: "Student List" },
  { to: "/profile", label: "Student Profile" },
  { to: "/courses", label: "Courses" },
  { to: "/attendance", label: "Attendance" },
  { to: "/notifications", label: "Notifications" }
];

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">SD</span>
          <div>
            <h1>Student Dashboard</h1>
            <p>Academic portal</p>
          </div>
        </div>

        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
    </div>
  );
}
