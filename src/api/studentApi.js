import axios from "axios";
import dashboardMock from "../mock/dashboard.json";
import studentsMock from "../mock/students.json";
import profileMock from "../mock/profile.json";
import coursesMock from "../mock/courses.json";
import attendanceMock from "../mock/attendance.json";
import notificationsMock from "../mock/notifications.json";

const api = axios.create({
  baseURL: "https://invalid-student-api.example.com/api",
  timeout: 1200
});

async function requestWithFallback(endpoint, fallbackData) {
  try {
    const response = await api.get(endpoint);
    return {
      data: response.data,
      source: "backend",
      error: null
    };
  } catch (error) {
    return {
      data: fallbackData,
      source: "mock",
      error: error.message || "Backend API unavailable"
    };
  }
}

export function fetchDashboard() {
  return requestWithFallback("/dashboard", dashboardMock);
}

export function fetchStudents() {
  return requestWithFallback("/students", studentsMock);
}

export function fetchProfile() {
  return requestWithFallback("/students/current", profileMock);
}

export function fetchCourses() {
  return requestWithFallback("/courses", coursesMock);
}

export function fetchAttendance() {
  return requestWithFallback("/attendance", attendanceMock);
}

export function fetchNotifications() {
  return requestWithFallback("/notifications", notificationsMock);
}
